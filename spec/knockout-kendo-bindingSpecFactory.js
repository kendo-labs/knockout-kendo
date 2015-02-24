//TODO: handling parent/child bindings
//generate jasmine tests for a binding
(function(ko, $, undefined) {
var testbed;
ko.kendo = ko.kendo || {};

ko.kendo.generateBindingSpecs = function(bindingName, testOptions) {
    var widgetConfig;
    if (ko.bindingHandlers[bindingName]) {
        widgetConfig = ko.bindingHandlers[bindingName].widgetConfig;
        if (widgetConfig) {
            return describe(widgetConfig.name + " generated specs", function() {
                beforeEach(function() {
                    testbed = $("<div></div>").appendTo("body");
                });

                afterEach(function() {
                    ko.removeNode(testbed[0]);
                });

                generateBasicTests(widgetConfig);
                generateWidgetInitializationTests(widgetConfig, testOptions);
                generateEventHandlerTests(widgetConfig, testOptions);
                generatewatchTests(widgetConfig, testOptions);
                generateDisposalTests(widgetConfig, testOptions);
            });
        }
    }
};

var generateBasicTests = function(widgetConfig) {
    describe("when the binding is created", function() {
        it("should add the binding to ko.bindingHandlers", function() {
            expect(ko.bindingHandlers[widgetConfig.name]).toBeDefined();
        });

        it("should add an init function", function() {
            expect(typeof ko.bindingHandlers[widgetConfig.name].init).toEqual("function");
            expect(ko.bindingHandlers[widgetConfig.name].init.length).toEqual(5);
        });
    });
};

var generateWidgetInitializationTests = function(widgetConfig, testOptions) {
    describe(widgetConfig.name + " initialization tests", function() {
        var vm, widget, el, defaultOption,
            setup = function(element, data) {
                        testbed.append(element);
                        vm = data;
                        el = element;
                        ko.applyBindings(vm, testbed[0]);

                        waits(0);

                        runs(function() {
                            widget = el.data(widgetConfig.name);
                            defaultOption = widget[widgetConfig.defaultOption];
                        });
                    };

        describe("when passing default value to binding", function() {
            var test;

            beforeEach(function() {
                test = $(testOptions.html).first().attr("data-bind", widgetConfig.name + ": defaultValue");
                vm = { defaultValue: ko.observable(testOptions.defaultValue) };
                setup(test, vm);
            });

            it("should initialize the widget", function() {
                expect(widget).toBeDefined();
            });

            if (widgetConfig.defaultOption && widgetConfig.defaultOption !== "data") {
                if (!testOptions.defaultIsHandler) {
                    it("should set the widget's default option with the observable's value", function() {
                        var value = typeof defaultOption === "function" ? defaultOption.call(widget) : ko.toJS(defaultOption.data());
                        expect(value).toEqual(testOptions.defaultValue);
                    });

                    describe("when updating the observable bound to the default option", function() {
                        it("should update the widget's default option with the new value", function() {
                            vm.defaultValue(testOptions.newValue);

                            waits(10);

                            runs(function () {
                                var value = typeof defaultOption === "function" ? defaultOption.call(widget) : ko.toJS(defaultOption.data());
                                expect(value).toEqual(testOptions.newValue);
                            });
                        });
                    });
                }
            }
        });

        describe("when passing an options object to binding", function() {
            var test, defaultOption;

            beforeEach(function() {
                var options = widgetConfig.name + ": " + (widgetConfig.defaultOption ? "{ " + widgetConfig.defaultOption + ": defaultValue }" : "{}");
                test = $(testOptions.html).first().attr("data-bind", options);
                vm = { defaultValue: ko.observable(testOptions.defaultValue) };
                setup(test, vm);
                defaultOption = widget[widgetConfig.defaultOption];
            });

            it("should initialize the widget", function() {
                expect(widget).toBeDefined();
            });

            if (widgetConfig.defaultOption && widgetConfig.defaultOption !== "data") {
                if (!testOptions.defaultIsHandler) {
                    it("should set the widget's default option with the observable's value", function() {
                        var value = typeof defaultOption === "function" ? defaultOption.call(widget) : ko.toJS(defaultOption.data());
                        expect(value).toEqual(testOptions.defaultValue);
                    });

                    describe("when updating the observable bound to the default option", function() {
                        it("should update the widget's default option with the new value", function() {
                            vm.defaultValue(testOptions.newValue);

                            waits(10);

                            runs(function () {
                                var value = typeof defaultOption === "function" ? defaultOption.call(widget) : defaultOption.data();
                                expect(value).toEqual(testOptions.newValue);
                            });
                        });
                    });
                }

            }
        });
    });
//options accepted
};

var generateEventHandlerTests = function(widgetConfig, testOptions) {
    describe(widgetConfig.name + " event handler tests", function() {
        var vm, widget, el,
            setup = function(element, data) {
                        testbed.append(element);
                        vm = data;
                        el = element;
                        ko.applyBindings(vm, testbed[0]);
                    };

        beforeEach(function() {
            vm = {};
            var config, options = "";
            for (var prop in widgetConfig.events) {
                if (widgetConfig.events.hasOwnProperty(prop)) {
                    config = widgetConfig.events[prop];
                    config = typeof config === "string" ? { writeTo: config, value: config } : config;

                    //setup spies for testing that functions were called appropriately
                    if (typeof config === "function") {
                        vm[prop + "_spy"] = widgetConfig.events[prop] = jasmine.createSpy();
                    }
                    else {
                        vm[(config.call || config.writeTo) + "_spy"] = jasmine.createSpy();
                    }

                    if (config.writeTo) {
                        //create a computed (that calls the spy) to bind against the "writeTo" option
                        (function(writeTo) {
                            vm[writeTo + '_test'] = ko.computed({
                                read: function() {
                                    return vm[writeTo + "_spy"]();
                                },
                                write: function(newValue) {
                                    vm[writeTo + "_spy"](newValue);
                                }
                            });
                        })(config.writeTo);

                        //prevent duplicates
                        if (options.indexOf(config.writeTo + ": ") < 0) {
                            options += (options ? ", " : "{ ") + config.writeTo + ": " + config.writeTo + '_test';
                        }
                    }
                    else if (typeof config.call === "string") {
                        vm[config.call] = vm[config.call + "_spy"];

                        if (options.indexOf(config.call + ": ") < 0) {
                            options += (options ? ", " : "{ ") + config.call + ": " + config.call + '_spy';
                        }
                    }
                }
            }

            //build options to use in the data-bind string
            for (var option in testOptions.defaults || {}) {
                if (testOptions.defaults.hasOwnProperty(option)) {
                    if (options.indexOf(option + ": ") < 0) {
                        options += (options ? ", " : "{ ") + option + ": " + testOptions.defaults[option];
                    }
                }
            }

            options = options || "{"
            options += "}";
            test = $(testOptions.html).first().attr("data-bind", widgetConfig.name + ": " + options);
            setup(test, vm);

        });

        for (var prop in widgetConfig.events) {
            if (widgetConfig.events.hasOwnProperty(prop)) {
                (function(event, config) {
                    config = typeof config === "string" ? { writeTo: config, value: config } : config;

                    //test writing to an observable
                    if (!config.call) {
                        describe("when " + event + " event is triggered", function() {
                            it("should update " + config.writeTo + " with correct value", function() {
                                //wait for widgets that are initialized asynchronously
                                waits(0);

                                runs(function() {
                                    widget = $(el).data(widgetConfig.name);

                                    vm[config.writeTo + "_spy"].reset();

                                    //trigger the event
                                    widget.trigger(event);

                                    var propOrValue = config.value;
                                    value = (typeof propOrValue === "string" && widget[propOrValue]) ? widget[propOrValue]() : propOrValue;

                                    expect(vm[config.writeTo + "_spy"]).toHaveBeenCalledWith(value);
                                });
                            });
                        });
                    }
                    else if (typeof config === "function") {
                        //test calling a function
                        describe("when " + event + " event is triggered", function() {
                            it("should call the " + event + "handler with the appropriate arguments and context", function() {
                                var mostRecent;

                                //wait for widgets that are initialized asynchronously
                                waits(0);

                                runs(function() {
                                    var spy = vm[event + "_spy"];

                                    widget = $(el).data(widgetConfig.name);

                                    spy.reset();

                                    //trigger the event
                                    widget.trigger(event);

                                    mostRecent = spy.mostRecentCall;

                                    expect(mostRecent.object).toBe(vm);

                                    //if a function is configured directly in the widget config, then pass the options
                                    expect(typeof mostRecent.args[0]).toBe("object");
                                    expect(typeof mostRecent.args[1].preventDefault).toBe("function");
                                });
                            });
                        });
                    }
                    else if (config.call && widgetConfig[config.call]) {
                        //test calling a function
                        describe("when " + event + " event is triggered", function() {
                            it("should call the " + config.call + "handler with the appropriate arguments and context", function() {
                                var mostRecent;

                                //wait for widgets that are initialized asynchronously
                                waits(0);

                                runs(function() {
                                    widget = $(el).data(widgetConfig.name);

                                    vm[config.call + "_spy"].reset();

                                    //trigger the event
                                    widget.trigger(event);

                                    mostRecent = vm[config.call + "_spy"].mostRecentCall;

                                    expect(mostRecent.object).toBe(vm);
                                    expect(mostRecent.args[0]).toBe(vm);
                                    expect(typeof mostRecent.args[1].preventDefault).toBe("function");
                                });
                            });
                        });
                    }

                })(prop, widgetConfig.events[prop]);
            }
        }
    });
};

var generatewatchTests = function(widgetConfig) {
//initial values
//update observable
//single value vs. array
    describe(widgetConfig.name + " values to watch tests", function() {

    });
};

var generateDisposalTests = function(widgetConfig) {
//ko.cleanNode/ko.removeNode fires disposal
    describe(widgetConfig.name + " disposal tests", function() {

    });
};

})(ko, jQuery);