//handle require.js scenarios where kendo is not actually returned
kendo = kendo || window.kendo;

ko.kendo = ko.kendo || {};

var unwrap = ko.utils.unwrapObservable; //support older 2.x KO where ko.unwrap was not defined

ko.kendo.BindingFactory = function() {
    var self = this;

    this.createBinding = function(widgetConfig) {
        //only support widgets that are available when this script runs
        if (!$()[widgetConfig.parent || widgetConfig.name]) {
            return;
        }

        var binding = {};

        //the binding handler's init function
        binding.init = function(element, valueAccessor, all, vm, context) {
            //step 1: build appropriate options for the widget from values passed in and global options
            var options = self.buildOptions(widgetConfig, valueAccessor);

            //apply async, so inner templates can finish content needed during widget initialization
            if (options.async === true || (widgetConfig.async === true && options.async !== false)) {
                setTimeout(function() {
                    binding.setup(element, options, context);
                }, 0);
                return;
            }

            binding.setup(element, options, context);

            if (options && options.useKOTemplates) {
                return { controlsDescendantBindings: true };
            }
        };

        //build the core logic for the init function
        binding.setup = function(element, options, context) {
            var widget, $element = $(element);

            //step 2: setup templates
            self.setupTemplates(widgetConfig.templates, options, element, context);

            //step 3: initialize widget
            widget = self.getWidget(widgetConfig, options, $element);

            //step 4: add handlers for events that we need to react to for updating the model
            self.handleEvents(options, widgetConfig, element, widget, context);

            //step 5: set up computed observables to update the widget when observable model values change
            self.watchValues(widget, options, widgetConfig, element);

            //step 6: handle disposal, if there is a destroy method on the widget
            if (widget.destroy) {
                ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                    if (widget.element) {
                        if (typeof kendo.destroy === "function") {
                            kendo.destroy(widget.element);
                        } else {
                            widget.destroy();
                        }
                    }
                });
            }
        };

        binding.options = {}; //global options
        binding.widgetConfig = widgetConfig; //expose the options to use in generating tests

        ko.bindingHandlers[widgetConfig.bindingName || widgetConfig.name] = binding;
    };

    //combine options passed in binding with global options
    this.buildOptions = function(widgetConfig, valueAccessor) {
        var defaultOption = widgetConfig.defaultOption,
            options = ko.utils.extend({}, ko.bindingHandlers[widgetConfig.name].options),
            valueOrOptions = unwrap(valueAccessor());

        if (valueOrOptions instanceof kendo.data.DataSource || typeof valueOrOptions !== "object" || valueOrOptions === null || (defaultOption && !(defaultOption in valueOrOptions))) {
            options[defaultOption] = valueAccessor();
        }  else {
            ko.utils.extend(options, valueOrOptions);
        }

        return options;
    };

    var templateRenderer = function(id, context) {
        return function(data) {
            return ko.renderTemplate(id, context.createChildContext((data._raw && data._raw()) || data));
        };
    };

    //prepare templates, if the widget uses them
    this.setupTemplates = function(templateConfig, options, element, context) {
        var i, j, option, existingHandler;

        if (templateConfig && options && options.useKOTemplates) {
            //create a function to render each configured template
            for (i = 0, j = templateConfig.length; i < j; i++) {
                option = templateConfig[i];
                if (options[option]) {
                    options[option] = templateRenderer(options[option], context);
                }
            }

            //initialize bindings in dataBound event
            existingHandler = options.dataBound;
            options.dataBound = function() {
                ko.memoization.unmemoizeDomNodeAndDescendants(element);
                if (existingHandler) {
                    existingHandler.apply(this, arguments);
                }
            };
        }
    };

    //unless the object is a kendo datasource, get a clean object with one level unwrapped
    this.unwrapOneLevel = function(object) {
        var prop,
            result = {};

        if (object) {
            if (object instanceof kendo.data.DataSource) {
                result = object;
            }
            else if (typeof object === "object") {
                for (prop in object) {
                    //include things on prototype
                    result[prop] = unwrap(object[prop]);
                }
            }
        }

        return result;
    };

    //return the actual widget
    this.getWidget = function(widgetConfig, options, $element) {
        var widget;
        if (widgetConfig.parent) {
            //locate the actual widget
            var parent = $element.closest("[data-bind*='" + widgetConfig.parent + ":']");
            widget = parent.length ? parent.data(widgetConfig.parent) : null;
        } else {
            widget = $element[widgetConfig.name](this.unwrapOneLevel(options)).data(widgetConfig.name);
        }

        //if the widget option was specified, then fill it with our widget
        if (ko.isObservable(options.widget)) {
            options.widget(widget);
        }

        return widget;
    };

    //respond to changes in the view model
    this.watchValues = function(widget, options, widgetConfig, element) {
        var watchProp, watchValues = widgetConfig.watch;
        if (watchValues) {
            for (watchProp in watchValues) {
                if (watchValues.hasOwnProperty(watchProp)) {
                    self.watchOneValue(watchProp, widget, options, widgetConfig, element);
                }
            }
        }
    };

    this.watchOneValue = function(prop, widget, options, widgetConfig, element) {
        var computed = ko.computed({
            read: function() {
                var existing, custom,
                    action = widgetConfig.watch[prop],
                    value = unwrap(options[prop]),
                    params = widgetConfig.parent ? [element] : []; //child bindings pass element first to APIs

                //support passing multiple events like ["open", "close"]
                if ($.isArray(action)) {
                    action = widget[value ? action[0] : action[1]];
                } else if (typeof action === "string") {
                    action = widget[action];
                } else {
                    custom = true; //running a custom function
                }

                if (action && options[prop] !== undefined) {
                    if (!custom) {
                        existing = action.apply(widget, params);
                        params.push(value);
                    } else {
                        params.push(value, options);
                    }

                    //try to avoid unnecessary updates when the new value matches the current value
                    if (custom || existing !== value) {
                        action.apply(widget, params);
                    }
                }
            },
            disposeWhenNodeIsRemoved: element
        }).extend({ throttle: (options.throttle || options.throttle === 0) ? options.throttle : 1 });

        //if option is not observable, then dispose up front after executing the logic once
        if (!ko.isObservable(options[prop])) {
            computed.dispose();
        }
    };

    //write changes to the widgets back to the model
    this.handleEvents = function(options, widgetConfig, element, widget, context) {
        var prop, eventConfig, events = widgetConfig.events;

        if (events) {
            for (prop in events) {
                if (events.hasOwnProperty(prop)) {
                    eventConfig = events[prop];
                    if (typeof eventConfig === "string") {
                        eventConfig = { value: eventConfig, writeTo: eventConfig };
                    }

                    self.handleOneEvent(prop, eventConfig, options, element, widget, widgetConfig.childProp, context);
                }
            }
        }
    };

    //bind to a single event
    this.handleOneEvent = function(eventName, eventConfig, options, element, widget, childProp, context) {
        var handler = typeof eventConfig === "function" ? eventConfig : options[eventConfig.call];

        //call a function defined directly in the binding definition, supply options that were passed to the binding
        if (typeof eventConfig === "function") {
            handler = handler.bind(context.$data, options);
        }
        //use function passed in binding options as handler with normal KO args
        else if (eventConfig.call && typeof options[eventConfig.call] === "function") {
            handler = options[eventConfig.call].bind(context.$data, context.$data);
        }
        //option is observable, determine what to write to it
        else if (eventConfig.writeTo && ko.isWriteableObservable(options[eventConfig.writeTo])) {
            handler = function(e) {
                var propOrValue, value;

                if (!childProp || !e[childProp] || e[childProp] === element) {
                    propOrValue = eventConfig.value;
                    value = (typeof propOrValue === "string" && this[propOrValue]) ? this[propOrValue](childProp && element) : propOrValue;
                    options[eventConfig.writeTo](value);
                }
            };
        }

        if (handler) {
            widget.bind(eventName, handler);
        }
    };
};

ko.kendo.bindingFactory = new ko.kendo.BindingFactory();

//utility to set the dataSource with a clean copy of data. Could be overridden at run-time.
ko.kendo.setDataSource = function(widget, data, options) {
    var isMapped, cleanData;

    if (data instanceof kendo.data.DataSource) {
        widget.setDataSource(data);
        return;
    }

    if (!options || !options.useKOTemplates) {
        isMapped = ko.mapping && data && data.__ko_mapping__;
        cleanData = data && isMapped ? ko.mapping.toJS(data) : ko.toJS(data);
    }

    widget.dataSource.data(cleanData || data);
};

//attach the raw data after Kendo wraps our items
(function() {
    var existing = kendo.data.ObservableArray.fn.wrap;
    kendo.data.ObservableArray.fn.wrap = function(object) {
        if (object === null) {
            return;
        }
        var result = existing.apply(this, arguments);
        result._raw = function() {
            return object;
        };

        return result;
    };
})();

//private utility function generator for gauges
var extendAndRedraw = function(prop) {
    return function(value) {
        if (value) {
            ko.utils.extend(this.options[prop], value);
            this.redraw();
            this.value(0.001 + this.value());
        }
    };
};

var openIfVisible = function(value, options) {
    if (!value) {
        //causes issues with event triggering, if closing programmatically, when unnecessary
        if (this.element.parent().is(":visible")) {
            this.close();
        }
    } else {
        this.open(typeof options.target === "string" ? $(unwrap(options.target)) : options.target);
    }
};
