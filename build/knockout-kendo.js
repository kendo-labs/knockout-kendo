//knockout-kendo v0.1.0 | (c) 2012 Ryan Niemeyer | http://www.opensource.org/licenses/mit-license
(function(ko, $, undefined) {
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
        binding.init = function(element, valueAccessor, allBindingsAccessor) {
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

            //step 2: add handlers for events that we need to react to for updating the model
            self.handleEvents(widgetConfig.events, options, function() { return $element.data(widgetConfig.name); });

            //step 3: initialize widget
            widget = self.getWidget(widgetConfig, options, $element);

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


//library is in a closure, use this private variable to reduce size of minified file
var createBinding = ko.kendo.bindingFactory.createBinding.bind(ko.kendo.bindingFactory);

//use constants to ensure consistency and to help reduce minified file size
var CLOSE = "close",
    COLLAPSE = "collapse",
    CONTENT = "content",
    DATA = "data",
    DISABLE = "disable",
    ENABLE = "enable",
    EXPAND = "expand",
    ENABLED = "enabled",
    EXPANDED = "expanded",
    ISOPEN = "isOpen",
    MAX = "max",
    MIN = "min",
    OPEN = "open",
    SEARCH = "search",
    SELECT = "select",
    SELECTED = "selected",
    SIZE = "size",
    TITLE = "title",
    VALUE = "value",
    VALUES = "values";

createBinding({
    name: "kendoAutoComplete",
    events: {
        change: VALUE,
        open: {
            writeTo: ISOPEN,
            value: true
        },
        close: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        enabled: ENABLE,
        search: [SEARCH, CLOSE],
        data: function(value) {
            this.dataSource.data(value);
        },
        value: VALUE
    }
});
createBinding({
    name: "kendoCalendar",
    defaultOption: VALUE,
    events: {
        change: VALUE
    },
    watch: {
        max: MAX,
        min: MIN,
        value: VALUE
    }
});
createBinding({
    name: "kendoComboBox",
    events: {
        change: VALUE,
        open: {
            writeTo: ISOPEN,
            value: true
        },
        close: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        enabled: ENABLE,
        isOpen: [OPEN, CLOSE],
        data: function(value) {
            this.dataSource.data(value);
        },
        value: VALUE
    }
});
createBinding({
    name: "kendoDatePicker",
    defaultOption: VALUE,
    events: {
        change: VALUE,
        open:
        {
            writeTo: ISOPEN,
            value: true
        },
        close: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        enabled: ENABLE,
        max: MAX,
        min: MIN,
        value: VALUE,
        isOpen: [OPEN, VALUE]
    }
});
createBinding({
    name: "kendoDropDownList",
    events: {
        change: VALUE,
        open: {
            writeTo: ISOPEN,
            value: true
        },
        close: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        enabled: ENABLE,
        isOpen: [OPEN, CLOSE],
        data: function(value) {
            this.dataSource.data(value);
        },
        value: VALUE
    }
});
createBinding({
    name: "kendoEditor",
    defaultOption: VALUE,
    events: {
        change: VALUE
    },
    watch: {
        enabled: ENABLE,
        value: VALUE
    }
});
createBinding({
    name: "kendoGrid",
    defaultOption: DATA,
    watch: {
        data: function(value) {
            this.dataSource.data(value);
        }
    }
});
createBinding({
    name: "kendoListView",
    defaultOption: DATA,
    watch: {
        data: function(value) {
            this.dataSource.data(value);
        }
    }
});
createBinding({
    name: "kendoMenu",
    async: true
});

createBinding({
    name: "kendoMenuItem",
    parent: "kendoMenu",
    watch: {
        enabled: ENABLE,
        isOpen: [OPEN, CLOSE]
    },
    async: true
});
createBinding({
    name: "kendoNumericTextBox",
    defaultOption: VALUE,
    events: {
        change: VALUE
    },
    watch: {
        enabled: ENABLE,
        value: VALUE,
            max: function(newMax) {
                this.options.max = newMax;
                //make sure current value is still valid
                if (this.value() > newMax) {
                    this.value(newMax);
                }
            },
            min: function(newMin) {
                console.log(this);
                this.options.min = newMin;
                //make sure that current value is still valid
                if (this.value() < newMin) {
                    this.value(newMin);
                }
            }
    }
});
createBinding({
    name: "kendoPanelBar",
    async: true
});

createBinding({
    name: "kendoPanelItem",
    parent: "kendoPanelBar",
    updateableOptions: [ENABLE],
    watch: {
        enabled: ENABLE,
        expanded: [EXPAND, COLLAPSE]
    },
    async: true
});
createBinding({
    name: "kendoRangeSlider",
    defaultOption: VALUES,
    events: {
        change: VALUES
    },
    watch: {
        values: VALUES,
        enabled: [ENABLE, DISABLE]
    }
});
createBinding({
    name: "kendoSlider",
    defaultOption: VALUE,
    events: {
        change: VALUE
    },
    watch: {
        value: VALUE,
        enabled: [ENABLE, DISABLE]
    }
});
createBinding({
    name: "kendoSplitter",
    async: true
});

createBinding({
    name: "kendoSplitterPane",
    parent: "kendoSplitter",
    watch: {
        max: MAX,
        min: MIN,
        size: SIZE,
        expanded: [EXPAND, COLLAPSE]
    },
    async: true
});
createBinding({
    name: "kendoTabStrip",
    async: true
});

createBinding({
    name: "kendoTab",
    parent: "kendoTabStrip",
    watch: {
        selected: function(element, value) {
            this.select(value ? element : null);
        },
        enabled: ENABLE
    },
    async: true
});
createBinding({
    name: "kendoTimePicker",
    defaultOption: VALUE,
    events: {
        change: VALUE
    },
    watch: {
        max: MAX,
        min: MIN,
        value: VALUE,
        enabled: ENABLE,
        isOpen: [OPEN, CLOSE]
    }
});
createBinding({
    name: "kendoTreeView",
    async: true
});

createBinding({
    name: "kendoTreeItem",
    parent: "kendoTreeView",
    watch: {
        enabled: ENABLE,
        expanded: [EXPAND, COLLAPSE],
        select: function(element, value) {
            this.select(value ? element : null);
        }
    },
    async: true
});
createBinding({
    name: "kendoUpload",
    watch: {
        enabled: [ENABLE, DISABLE]
    }
});
createBinding({
    name: "kendoWindow",
    events: {
        open: {
            writeTo: ISOPEN,
            value: true
        },
        close: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        content: CONTENT,
        title: TITLE,
        isOpen: [OPEN, CLOSE]
    }
});

})(ko, jQuery);