describe("knockout-kendo-core", function(){
    jQuery.fn.mockWidget = function(options) {
        this.data("mockWidget", options);
        return this;
    };

    jQuery.fn.mockWidgetChild = function(options) {
        this.data("mockWidgetChild", options);
        return this;
    };

    describe("buildOptions", function() {
        var widgetConfig, value, valueAccessor, options;
        describe("when passing a default option", function() {
            beforeEach(function() {
                widgetConfig = { name: "test", defaultOption: "value"};
                value = ko.observable("testing");
                valueAccessor = function() { return value; };
                ko.bindingHandlers.test = { options: {} };
            });

            it("should return the options with the default populated", function() {
                options = ko.kendo.bindingFactory.buildOptions(widgetConfig, valueAccessor);
                expect(options).toBeDefined();
                expect(options.value).toEqual(value);
            });

            describe("when global options are defined", function() {
                it("should merge the global options with the option passed into the binding", function() {
                    ko.bindingHandlers.test.options = { myOption: "myOptionValue" };
                    options = ko.kendo.bindingFactory.buildOptions(widgetConfig, valueAccessor);
                    expect(options).toBeDefined();
                    expect(options.value).toEqual(value);
                    expect(options.myOption).toEqual("myOptionValue");
                });
            });

            describe("when default option is null", function() {
                it("should set the value to null", function() {
                    value = ko.observable(null);
                    valueAccessor = function() { return value; };
                    options = ko.kendo.bindingFactory.buildOptions(widgetConfig, valueAccessor);
                    expect(options).toBeDefined();
                    expect(options.value).toEqual(value);
                });
            });

            describe("when default option is a kendo.data.DataSource", function() {
                it("should set the value to the data source", function() {
                    value = new kendo.data.DataSource();
                    valueAccessor = function() { return value; };
                    options = ko.kendo.bindingFactory.buildOptions(widgetConfig, valueAccessor);
                    expect(options).toBeDefined();
                    expect(options.value).toEqual(value);
                });
            });
        });

        describe("when passing options", function() {
            beforeEach(function() {
                widgetConfig = { name: "test", defaultOption: "value"};
                value = ko.observable("testing");
                valueAccessor = function() { return { value: "myValue", myOption: "myOptionValue", myOption2: "myOption2Value" }; };
                ko.bindingHandlers.test = { options: {} };
            });

            it("should return the options as they were passed in", function() {
                options = ko.kendo.bindingFactory.buildOptions(widgetConfig, valueAccessor);
                expect(options).toBeDefined();
                expect(options.value).toEqual("myValue");
                expect(options.myOption).toEqual("myOptionValue");
                expect(options.myOption2).toEqual("myOption2Value");
            });

            describe("when global options are defined", function() {
                beforeEach(function() {
                    ko.bindingHandlers.test.options = { myOption: "myGlobalValue", myOption3: "myOption3Value" };
                    options = ko.kendo.bindingFactory.buildOptions(widgetConfig, valueAccessor);
                });

                it("should respect an override in the binding to a global option", function() {
                    expect(options.myOption).toEqual("myOptionValue");
                });

                it("should accept an option in the binding that is not configured globally", function() {
                    expect(options.myOption2).toEqual("myOption2Value");
                });

                it("should accept an option configured globally that is not passed in on the binding", function() {
                    expect(options.myOption3).toEqual("myOption3Value");
                });
            });
        });
    });

    describe("handleEvents", function() {
        describe("when given an object with events as keys", function() {
            var options, widgetConfig, widget, context;

            beforeEach(function() {
                context = {
                    $data: {}
                };

                options = {
                    optionOne: ko.observable("one value"),
                    optionTwo: "two value",
                    optionSix: ko.observable("six value"),
                    optionSeven: function(data) {
                        expect(this).toBe(context.$data);
                        expect(data).toBe(context.$data);
                    }
                };

                widgetConfig = {
                    events: {
                        eventOne: {
                            writeTo: "optionOne",
                            value: "methodOne"
                        },
                        eventTwo: {
                            writeTo:"optionOne",
                            value: "not a method"
                        },
                        eventThree: {
                            writeTo: "optionOne",
                            value: true
                        },
                        eventFour: {
                            writeTo: "optionTwo",
                            value: true
                        },
                        eventFive: {
                            writeTo: "badOption",
                            value: true
                        },
                        eventSix: {
                            writeTo: "optionSix",
                            value: true
                        },
                        eventSeven: {
                            call: "optionSeven"
                        }
                    }
                };

                widget = {
                    bind: function(eventName, handler) {
                        widget.handlers[eventName] = widget.handlers[eventName] || [];
                        widget.handlers[eventName].push(handler);
                    },
                    handlers: {},
                    methodOne: function() {
                        return "methodOne value";
                    }
                };
                ko.kendo.bindingFactory.handleEvents(options, widgetConfig, null, widget, context);
            });

            describe("when writeTo corresponds to an observable", function() {
                describe("when value is a string", function() {
                    describe("when value corresponds to a method on the widget", function() {
                        it("should update the observable by reading the value from the method", function() {
                            widget.handlers.eventOne[0].call(widget);
                            expect(options.optionOne()).toEqual("methodOne value");
                        });
                    });
                    describe("when value does not correspond to a method on the widget", function() {
                        it("should update the observable with literal value", function() {
                            widget.handlers.eventTwo[0].call(widget);
                            expect(options.optionOne()).toEqual("not a method");
                        });
                    });
                });

                describe("when value is a boolean", function() {
                    it("should update the observable with the boolean value", function() {
                        widget.handlers.eventThree[0].call(widget);
                        expect(options.optionOne()).toEqual(true);
                    });
                });

                describe("when there is an existing handler for the event", function() {
                    it("should update the observable when the handler is called", function() {
                        widget.handlers.eventSix[0].call(widget);
                        expect(options.optionSix()).toEqual(true);
                    });
                });
            });

            describe("when a handler is provided by call option", function() {
                it("should bind the handler", function() {
                    widget.handlers.eventSeven[0].call(widget);
                });
            });
        });
    });

    describe("getWidget", function() {
        var widget, $el, widgetConfig, options;

        var setup = function($elem, config, opts) {
            $el = $elem || $el;
            widget = ko.kendo.bindingFactory.getWidget(config || widgetConfig, opts || options, $el);
        };

        beforeEach(function() {
            $el = $("<div></div>");
            widgetConfig = { name: "mockWidget" };
            options = { optionOne: "valOne", optionTwo: "valTwo" };
        });

        describe("when widget does not exist yet", function() {
            it("should create the widget", function() {
                setup();
                expect(widget).toEqual(options);
                expect($el.data("mockWidget")).toEqual(options);
            });
        });

        describe("when passing options", function() {
           it("should only unwrap the top-level properties", function() {
               var options = {
                   plain: "plain property",
                   observable: ko.observable("observable property"),
                   nested: {
                       observable: ko.observable("nested observable")
                   },
                   dataSource: new kendo.data.DataSource()
               }
               setup(null, null, options);

               expect(widget.plain).toEqual(options.plain);
               expect(widget.observable).toEqual(options.observable()); //unwrapped
               expect(widget.nested.observable).toEqual(options.nested.observable); //not unwrapped
               expect(widget.dataSource).toEqual(options.dataSource); //not touched
           });

        });

        describe("when widget is really on a parent", function() {
            it("should return the parents widget", function() {
                setup($("<ul data-bind='mockWidget: {}'><li></li></ul>"));
                expect(widget).toEqual(options);
                setup($el.children().first(), { name: "mockWidgetChild", parent: "mockWidget" }, { childOption: "childValue" });
                expect(widget).toEqual(options);
            });
        });
    });

    describe("watchValues", function() {
        var widget, options, widgetConfig, $element, test;

        beforeEach(function() {
            $element = $("<div></div>");
            options = {
                optionOne: ko.observable("valueOne"),
                optionTwo: ko.observable(true),
                optionThree: ko.observable("valueThree"),
                optionFour: ko.observable("valueFour"),
                optionFive: "valueFive"
            };
            widgetConfig = {
                watch: {
                    optionOne: "methodOne",
                    optionTwo: ["methodTwoA", "methodTwoB"],
                    optionThree: function() {},
                    optionFour: "missingMethod",
                    optionFive: "methodFive",
                    optionSix: "methodSix"
                }
            };

            widget = {
                methodOne: function() {},
                methodTwoA: function() {},
                methodTwoB: function() {},
                methodFive: function() {},
                methodSix: function() {}
            }
        });

        afterEach(function() {
            $element.remove();
        });

        var setup = function(widg, opt, config, el) {
            $("body").append(el || $element);
            ko.kendo.bindingFactory.watchValues(widg || widget, opt || options, config || widgetConfig, el || $element[0]);
        };

        describe("when bound from parent binding", function() {
            describe("when key corresponds to an observable", function() {
                describe("when value is a string", function() {
                    it("should call the widget's function with the observable's value", function() {
                        spyOn(widget, "methodOne");
                        setup();
                        expect(widget.methodOne).toHaveBeenCalledWith("valueOne");
                    });
                });

                describe("when value is an array", function() {
                    beforeEach(function() {
                        spyOn(widget, "methodTwoA");
                        spyOn(widget, "methodTwoB");
                    });

                    describe("when the observable's value is truthy", function() {
                        it("should call the first function in the array with true", function() {
                            setup();

                            waits(10);

                            runs(function () {
                                expect(widget.methodTwoA).toHaveBeenCalledWith(true);
                            });
                        });

                        describe("when the observable's value changed to false", function() {
                            it("should call the second function in the array with false", function() {
                                setup();

                                waits(10);

                                options.optionTwo(false);

                                runs(function () {
                                    expect(widget.methodTwoB).toHaveBeenCalledWith(false);
                                });
                            });
                        });
                    });

                    describe("when the observable's value is falsey", function() {

                        it("should call the second function in the array with false", function() {
                            options.optionTwo(false);
                            setup();
                            expect(widget.methodTwoB).toHaveBeenCalledWith(false);
                        });

                        describe("when the observable's value changed to true", function() {
                            it("should call the first function in the array with true", function() {
                                options.optionTwo(false);

                                setup();

                                options.optionTwo(true);

                                waits(10);

                                runs(function () {
                                    expect(widget.methodTwoA).toHaveBeenCalledWith(true);
                                });
                            });
                        });
                    });
                });

                describe("when value is a function", function() {
                    it("should call the function with the observable's value and the options", function() {
                        spyOn(widgetConfig.watch, "optionThree");
                        setup();
                        expect(widgetConfig.watch.optionThree).toHaveBeenCalledWith("valueThree", options);
                    });
                });
            });

            describe("when key corresponds to a non-observable", function() {
                it("should call the widget's function initially", function() {
                    spyOn(widget, "methodFive");
                    setup();
                    expect(widget.methodFive).toHaveBeenCalled();
                });
            });

            describe("when key does not correspond to a property", function() {
                it("should not call the widget's function", function() {
                    spyOn(widget, "methodSix");
                    setup();
                    expect(widget.methodSix).not.toHaveBeenCalled();
                });
            });
        });

        describe("when bound from a child binding", function() {
            beforeEach(function() {
                widgetConfig.parent = "test";
            });

            describe("when key corresponds to an observable", function() {
                describe("when value is a string", function() {
                    it("should call the widget's function with the element and the observable's value", function() {
                        spyOn(widget, "methodOne");
                        setup();
                        expect(widget.methodOne).toHaveBeenCalledWith($element[0], "valueOne");
                    });
                });

                describe("when value is an array", function() {
                    beforeEach(function() {
                        spyOn(widget, "methodTwoA");
                        spyOn(widget, "methodTwoB");
                    });

                    describe("when the observable's value is truthy", function() {
                        it("should call the first function in the array with true", function() {
                            setup();
                            expect(widget.methodTwoA).toHaveBeenCalledWith($element[0], true);
                        });

                        describe("when the observable's value changed to false", function() {
                            it("should call the second function in the array with false", function() {
                                setup();

                                options.optionTwo(false);

                                waits(10);

                                runs(function () {
                                    expect(widget.methodTwoB).toHaveBeenCalledWith($element[0], false);
                                });
                            });
                        });
                    });

                    describe("when the observable's value is falsey", function() {

                        it("should call the second function in the array with false", function() {
                            options.optionTwo(false);
                            setup();
                            expect(widget.methodTwoB).toHaveBeenCalledWith($element[0], false);
                        });

                        describe("when the observable's value changed to true", function() {
                            it("should call the first function in the array with true", function() {
                                options.optionTwo(false);

                                setup();

                                options.optionTwo(true);

                                waits(10);

                                runs(function () {
                                    expect(widget.methodTwoA).toHaveBeenCalledWith($element[0], true);
                                });
                            });
                        });
                    });
                });

                describe("when value is a function", function() {
                    it("should call the function with the element, the observable's value and the options", function() {
                        spyOn(widgetConfig.watch, "optionThree");
                        setup();
                        expect(widgetConfig.watch.optionThree).toHaveBeenCalledWith($element[0], "valueThree", options);
                    });
                });
            });

            describe("when key corresponds to a non-observable", function() {
                it("should call the widget's function initially", function() {
                    spyOn(widget, "methodFive");
                    setup();
                    expect(widget.methodFive).toHaveBeenCalled();
                });
            });

            describe("when key does not correspond to a property", function() {
                it("should not call the widget's function", function() {
                    spyOn(widget, "methodSix");
                    setup();
                    expect(widget.methodSix).not.toHaveBeenCalled();
                });
            });
        });
    });

    describe("createBinding", function() {
        describe("when creating a simple binding", function() {
            it("should create the binding", function() {
                delete ko.bindingHandlers.mockWidget;
                ko.kendo.bindingFactory.createBinding({ name: 'mockWidget' });
                expect(ko.bindingHandlers.test).toBeDefined();
                expect(typeof ko.bindingHandlers.mockWidget.init).toEqual("function");
                expect(ko.bindingHandlers.mockWidget.options).toBeDefined();
                delete ko.bindingHandlers.mockWidget;
            });
        });
    });
});