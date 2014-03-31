---
layout: default
prefix: ../
name: DateTimePicker
description: The DateTimePicker widget allows a user to enter a date directly or open a visual calendar to make a selection.
docs: http://docs.telerik.com/kendo-ui/api/web/datetimepicker
examples:
    - title: Basic Example
      description: This example demonstrates passing a single option to bind against the value of the DateTimePicker widget.
      view: |
        <input data-bind="kendoDateTimePicker: startDate" />
        <hr/>
        <div data-bind="text: startDate"> </div>
      js: |
        var ViewModel = function() {
            this.startDate = ko.observable(new Date());
        };
      selected: true
      id: one
    - title: Passing additional options
      description: This example demonstrates passing additional options in the data-bind attribute with *value* now being explicitly specified. The *setToNow* button makes an update to the view model to show that the widget responds accordingly.
      view: |
        <input data-bind="kendoDateTimePicker: { value: startDate, max: maxDate, min: minDate }" />
        <hr/>
        <button data-bind="click: setToNow">Set to Now</button>
        <hr/>
        <div data-bind="text: startDate"> </div>
      js: |
        var ViewModel = function() {
            this.startDate = ko.observable(new Date(2012, 10, 30, 5, 30));
            this.maxDate = new Date(2012, 11 , 31, 2, 30);
            this.minDate = new Date(2012, 0, 1, 9, 30);
            this.setToNow = function() {
                this.startDate(new Date());
            };
        };
      id: two
    - title: Using global options
      description: This example demonstrates setting global options in *ko.bindingHandlers.kendoDateTimePicker.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
        <input data-bind="kendoDateTimePicker: startDate" />
        <hr/>
        <button data-bind="click: setToNow">Set to Now</button>
        <hr/>
        <div data-bind="text: startDate"> </div>
      js: |
        var ViewModel = function() {
            this.startDate = ko.observable(new Date(2012,10,30, 5, 30));
            this.setToNow = function() {
                this.startDate(new Date());
            };
        };
        
        ko.bindingHandlers.kendoDateTimePicker.options = {
            min: new Date(2012, 0, 1, 9, 30),
            max: new Date(2012, 11, 31, 2, 30)
        };
      id: three
      
liveOptions:
    - name: enabled
      description: Determines if users can interact with the field
    - name: isOpen
      description: Controls whether the navigatable calendar popup is visible
    - name: min
      description: The minimum date allowed for selection in the field
    - name: max
      description: The maximum date allowed for selection in the field
    - name: value
      description: The current date value of the field
    - name: widget
      description: If specified, will populate an observable with a reference to the actual widget

futurePlans:
---

{% include widget.html %}
