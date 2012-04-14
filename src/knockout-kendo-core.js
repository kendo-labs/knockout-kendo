ko.kendo = ko.kendo || {};

ko.kendo.BindingFactory = function() {
    var self = this;

    this.createBinding = function(widgetConfig) {
        //only support widgets that are available when this script runs
        if (!$()[widgetConfig.parent || widgetConfig.name]) {
            return;
        }

        var binding = {};

        //the binding handler's init function
        binding.init = function(element, valueAccessor, allBindingsAccessor, vm, context) {
              //step 1: build appropriate options for the widget from values passed in and global options
              var options = self.buildOptions(widgetConfig, valueAccessor);

              //apply async, so inner templates can finish content needed during widget initialization
              if (options.async || (widgetConfig.async && options.async !== false)) {
                  setTimeout(function() {
                      binding.setup(element, options, context);
                  }, 0);
              } else {
                  binding.setup(element, options, context);
              }

              if (widgetConfig.templates) {
                  return { controlsDescendantBindings: true };
              }
        };

        //build the core logic for the init function
        binding.setup = function(element, options, context) {
            var widget, $element = $(element);

            //step 2: add handlers for events that we need to react to for updating the model
            self.handleEvents(widgetConfig.events, options, function() { return $element.data(widgetConfig.name); });

            //step 3: setup templates
            self.setupTemplates(widgetConfig.templates, options, element, context);

            //step 4: initialize widget
            widget = self.getWidget(widgetConfig, options, $element);

            //step 5: set up computed observables to update the widget when observable model values change
            self.watchValues(widget, options, widgetConfig, element);

            //step 6: handle disposal, if there is a destroy method on the widget
            if(widget.destroy) {
                ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                    widget.destroy();
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
            valueOrOptions = ko.utils.unwrapObservable(valueAccessor());

        if (typeof valueOrOptions !== "object" || (defaultOption && !(defaultOption in valueOrOptions))) {
            options[defaultOption] = valueAccessor();
        }  else {
            ko.utils.extend(options, valueOrOptions);
        }

        return options;
    };

    var templateRenderer = function(id, context) {
        return function(data) {
            return ko.renderTemplate(id, context.createChildContext(data._raw || data));
        };
    };

    //prepare templates, if the widget uses them
    this.setupTemplates = function(templateConfig, options, element, context) {
        var i, j, option, existingHandler;

        if (templateConfig) {
            //initialize a ko.kendo.template for each named template
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

    //return the actual widget
    this.getWidget = function(widgetConfig, options, $element) {
        var widget;
        if (widgetConfig.parent) {
            //locate the actual widget
            var parent = $element.closest("[data-bind*=" + widgetConfig.parent + ":]");
            widget = parent.length ? parent.data(widgetConfig.parent) : null;
        } else {
            widget = $element[widgetConfig.name](ko.toJS(options)).data(widgetConfig.name);
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
                if (watchValues.hasOwnProperty(watchProp) && ko.isObservable(options[watchProp])) {
                    self.watchOneValue(watchProp, widget, options, widgetConfig, element);
                }
            }
        }
    };

    this.watchOneValue = function(prop, widget, options, widgetConfig, element) {
        ko.computed({
            read: function() {
                var action = widgetConfig.watch[prop],
                    value = ko.utils.unwrapObservable(options[prop]),
                    params = widgetConfig.parent ? [element, value] : [value]; //child bindings pass element first to APIs
                //support passing multiple events like ["open", "close"]
                if ($.isArray(action)) {
                    action = widget[value ? action[0] : action[1]];
                } else if (typeof action === "string") {
                    action = widget[action];
                } else {
                    params.push(options); //include options if running a custom function
                }

                if (action) {
                    action.apply(widget, params);
                }
            },
            disposeWhenNodeIsRemoved: element
        });
    };

    //write changes to the widgets back to the model
    this.handleEvents = function(events, options, widgetAccessor) {
        var prop, event;
        if (events) {
            for (prop in events) {
                if (events.hasOwnProperty(prop)) {
                    event = events[prop];
                    event = typeof event === "string" ? { value: event, writeTo: event } : event;
                    if (ko.isObservable(options[event.writeTo])) {
                        self.handleOneEvent(prop, event, options, widgetAccessor);
                    }
                }
            }
        }
    };

    //set on options for now, as using bind does not work for many events
    this.handleOneEvent = function(event, eventOptions, options, widgetAccessor) {
        var existing = options[event];
        options[event] = function() {
            var propOrValue = eventOptions.value,
                widget = widgetAccessor(),
                value = (typeof propOrValue === "string" && widget[propOrValue]) ? widget[propOrValue]() : propOrValue;

            options[eventOptions.writeTo](value);

            //if they passed in a handler in addition to the handling that we need done
            if (existing) {
                existing.apply(this, arguments);
            }
        };
    };
};

ko.kendo.bindingFactory = new ko.kendo.BindingFactory();

//utility to set the dataSource will a clean copy of data. Could be overriden at run-time.
ko.kendo.setDataSource = function(widget, data, options) {
    if (options.unwrap) {
        data = ko.mapping ? ko.mapping.toJS(data) : ko.toJS(data);
    }

    widget.dataSource.data(data);
};

//attach the raw data after Kendo wraps our items
(function() {
    var existing = kendo.data.ObservableArray.fn.wrap;
    kendo.data.ObservableArray.fn.wrap = function(object) {
        var result = existing.apply(this, arguments);
        result._raw = object;
        return result;
    };
})();