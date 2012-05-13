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
        binding.init = function(element, valueAccessor) {
              //step 1: build appropriate options for the widget from values passed in and global options
              var options = self.buildOptions(widgetConfig, valueAccessor);

              //apply async, so inner templates can finish content needed during widget initialization
              if (options.async === true || (widgetConfig.async === true && options.async !== false)) {
                  setTimeout(function() {
                      binding.setup(element, options);
                  }, 0);
                  return;
              }

              binding.setup(element, options);
        };

        //build the core logic for the init function
        binding.setup = function(element, options) {
            var widget, $element = $(element);

            //step 2: initialize widget
            widget = self.getWidget(widgetConfig, options, $element);

            //step 3: add handlers for events that we need to react to for updating the model
            self.handleEvents(options, widgetConfig, element, widget);

            //step 4: set up computed observables to update the widget when observable model values change
            self.watchValues(widget, options, widgetConfig, element);

            //step 5: handle disposal, if there is a destroy method on the widget
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

    //return the actual widget
    this.getWidget = function(widgetConfig, options, $element) {
        var widget;
        if (widgetConfig.parent) {
            //locate the actual widget
            var parent = $element.closest("[data-bind*='" + widgetConfig.parent + ":']");
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
                }
                if (action) {
                    action.apply(widget, params);
                }
            },
            disposeWhenNodeIsRemoved: element
        });
    };

    //write changes to the widgets back to the model
    this.handleEvents = function(options, widgetConfig, element, widget) {
        var prop, event, events = widgetConfig.events;

        if (events) {
            for (prop in events) {
                if (events.hasOwnProperty(prop)) {
                    event = events[prop];
                    if (typeof event === "string") {
                        event = { value: event, writeTo: event };
                    }

                    if (ko.isObservable(options[event.writeTo])) {
                        self.handleOneEvent(prop, event, options, element, widget, widgetConfig.childProp);
                    }
                }
            }
        }
    };

    //bind to a single event
    this.handleOneEvent = function(eventName, eventConfig, options, element, widget, childProp) {
        widget.bind(eventName, function(e) {
            var propOrValue, value;

            if (!childProp || !e[childProp] || e[childProp] === element) {
                propOrValue = eventConfig.value;
                value = (typeof propOrValue === "string" && this[propOrValue]) ? this[propOrValue](childProp && element) : propOrValue;
                options[eventConfig.writeTo](value);
            }
        });
    };
};

ko.kendo.bindingFactory = new ko.kendo.BindingFactory();

//utility to set the dataSource will a clean copy of data. Could be overriden at run-time.
ko.kendo.setDataSource = function(widget, data) {
    widget.dataSource.data(ko.mapping ? ko.mapping.toJS(data) : ko.toJS(data));
};
