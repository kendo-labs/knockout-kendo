---
layout: default
prefix: ../
name: TimePicker
description: The TimePicker widget allows a user to enter a date directly or open a visual calendar to make a selection.
docs: http://demos.kendoui.com/web/datepicker/index.html
examples:
    - title: Basic Example
      description: This example demonstrates passing a single option to bind against the value of the TimePicker widget.
      view: |
        <input data-bind="kendoTimePicker: startTime" />
        <hr/>
        <div data-bind="text: startTime"> </div>
      js: |
        var ViewModel = function() {
            this.startTime = ko.observable(new Date(2012, 11, 31, 11, 59, 59));
        };
      selected: true
      id: one
    - title: Passing additional options
      description: This example demonstrates passing additional options in the data-bind attribute with *value* now being explicitly specified. The *setToToday* button makes an update to the view model to show that the widget responds accordingly.
      view: |
        <input type="checkbox" data-bind="checked: isOpen" /> Open<br/>
        <input type="checkbox" data-bind="checked: enabled" /> Enabled<br/>
        <button data-bind="click: setToNow">Set to now</button>
        <hr/>
        <input data-bind="kendoTimePicker: { value: startTime, min: minTime, max: maxTime, enabled: enabled, isOpen: isOpen }" />
        <hr/>
        <div data-bind="text: startTime"> </div>
      js: |
        var ViewModel = function() {
            this.startTime = ko.observable(new Date(2012, 11, 31, 10, 0, 0));
            this.isOpen = ko.observable(false);
            this.enabled = ko.observable(true);
            this.minTime = new Date(1950, 0, 1, 8, 0, 0);
            this.maxTime = new Date(2049, 11, 31, 18, 0, 0);
            this.setToNow = function() {
                this.startTime(new Date());
            };
        };
      id: two
    - title: Using global options
      description: This example demonstrates setting global options in *ko.bindingHandlers.kendoTimePicker.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
        <input data-bind="kendoTimePicker: startTime" />
        <hr/>
        <div data-bind="text: startTime"> </div>
      js: |
        var ViewModel = function() {
            this.startTime = ko.observable(new Date(2012, 11, 31, 10, 0, 0));
        };
        
        ko.bindingHandlers.kendoTimePicker.options = {
            min: new Date(1950, 0, 1, 8, 0, 0),
            max: new Date(2049, 11, 31, 18, 0, 0)
        };
      id: three
      
liveOptions:
    - name: enabled
      description: Determines if users can interact with the field
    - name: isOpen
      description: Controls whether the dropdown list of times is visible
    - name: min
      description: The minimum time allowed for selection in the field
    - name: max
      description: The maximum time allowed for selection in the field
    - name: value
      description: The current time value of the field
      
futurePlans:
---

{% include widget.html %}
