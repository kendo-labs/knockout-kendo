/*
 * knockout-kendo v0.6.3
 * Copyright © 2013 Ryan Niemeyer & Telerik
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
 * See the License for the specific language governing permissions and 
 * limitations under the License.
 */
;(function(factory) {
    // CommonJS
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        factory(require('knockout'), require('jquery'), require('kendo'));
        // AMD
    } else if (typeof define === 'function' && define.amd) {
        define(['knockout', 'jquery', 'kendo'], factory);
        // Normal script tag
    } else {
        factory(window.ko, window.jQuery, window.kendo);
    }
}(function(ko, $, kendo, undefined) {

//handle require.js scenarios where kendo is not actually returned
kendo = kendo || window.kendo;

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
            self.handleEvents(options, widgetConfig, element, widget);

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
                    result[prop] = ko.utils.unwrapObservable(object[prop]);
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
                    value = ko.utils.unwrapObservable(options[prop]),
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
        });

        //if option is not observable, then dispose up front after executing the logic once
        if (!ko.isObservable(options[prop])) {
            computed.dispose();
        }
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

//library is in a closure, use this private variable to reduce size of minified file
var createBinding = ko.kendo.bindingFactory.createBinding.bind(ko.kendo.bindingFactory);

//use constants to ensure consistency and to help reduce minified file size
var CLOSE = "close",
    COLLAPSE = "collapse",
    CONTENT = "content",
    DATA = "data",
    ENABLE = "enable",
    EXPAND = "expand",
    ENABLED = "enabled",
    EXPANDED = "expanded",
    FILTER = "filter",
    HIDE = "hide",
    ISOPEN = "isOpen",
    MAX = "max",
    MIN = "min",
    OPEN = "open",
    PALETTE = "palette",
    RESIZE = "resize",
    SEARCH = "search",
    SELECT = "select",
    SELECTED = "selected",
    SHOW = "show",
    SIZE = "size",
    TARGET = "target",
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
            ko.kendo.setDataSource(this, value);
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
    name: "kendoColorPicker",
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
        value: VALUE,
        color: VALUE,
        palette: PALETTE
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
            ko.kendo.setDataSource(this, value);
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
        isOpen: [OPEN, CLOSE]
    }
});

createBinding({
    name: "kendoDateTimePicker",
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
        isOpen: [OPEN, CLOSE]
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
            ko.kendo.setDataSource(this, value);
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
        data: function(value, options) {
            ko.kendo.setDataSource(this, value, options);
        }
    },
    templates: ["rowTemplate", "altRowTemplate"]
});

createBinding({
    name: "kendoListView",
    defaultOption: DATA,
    watch: {
        data: function(value, options) {
            ko.kendo.setDataSource(this, value, options);
        }
    },
    templates: ["template"]
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
    name: "kendoMultiSelect",
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
            ko.kendo.setDataSource(this, value);
        },
        value: VALUE
    }
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
    watch: {
        enabled: ENABLE,
        expanded: [EXPAND, COLLAPSE]
    },
    childProp: "item",
    events: {
        expand: {
            writeTo: EXPANDED,
            value: true
        },
        collapse: {
            writeTo: EXPANDED,
            value: false
        }
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
        enabled: ENABLE
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
        enabled: ENABLE
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
    childProp: "pane",
    events: {
        collapse: {
            writeTo: EXPANDED,
            value: false
        },
        expand: {
            writeTo: EXPANDED,
            value: true
        },
        resize: SIZE
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
        enabled: ENABLE
    },
    childProp: "item",
    async: true
});

createBinding({
    name: "kendoTooltip",
    events: {},
    watch: {
        content: CONTENT,
        filter: FILTER
    }
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
        selected: function(element, value) {
            this.select(value ? element : null);
        }
    },
    childProp: "node",
    events: {
        collapse: {
            writeTo: EXPANDED,
            value: false
        },
        expand: {
            writeTo: EXPANDED,
            value: true
        },
        select: {
            writeTo: SELECTED,
            value: true
        }
    },
    async: true
});

createBinding({
    name: "kendoUpload",
    watch: {
        enabled: ENABLE
    }
});

createBinding({
    async: true,
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

createBinding({
    name: "kendoChart",
    watch: {
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        }
    }
});

createBinding({
    name: "kendoLinearGauge",
    defaultOption: VALUE,
    watch: {
        value: VALUE,
        gaugeArea: extendAndRedraw("gaugeArea"),
        pointer: extendAndRedraw("pointer"),
        scale: extendAndRedraw("scale")
    }
});

createBinding({
    name: "kendoRadialGauge",
    defaultOption: VALUE,
    watch: {
        value: VALUE,
        gaugeArea: extendAndRedraw("gaugeArea"),
        pointer: extendAndRedraw("pointer"),
        scale: extendAndRedraw("scale")
    }
});

}));
