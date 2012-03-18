---
layout: default
prefix: ../
name: Calendar
description: The Calendar widget provides a visual calendar that supports navigation.
docs: http://demos.kendoui.com/web/calendar/index.html
examples:
    - title: Basic Example
      description: This is a basic example
      view: |
        <div data-bind="kendoCalendar: startDate"> </div>
        <hr/>
        <div data-bind="text: startDate"> </div>
      js: |
        var ViewModel = function() {
            this.startDate = ko.observable(new Date());
        };
      selected: true
      id: one
    - title: Passing additional options
      description: This is a sample that shows passing additional options in the data-bind attribute
      view: |
        <div data-bind="kendoCalendar: { value: startDate, max: maxDate, min: minDate }"> </div>
        <hr/>
        <button data-bind="click: setToToday">Set to Today</button>
        <hr/>
        <div data-bind="text: startDate"> </div>
      js: |
        var ViewModel = function() {
            this.startDate = ko.observable(new Date(2012,10,30));
            this.maxDate = new Date(2012, 11 , 31);
            this.minDate = new Date(2012, 0, 1);
            this.setToToday = function() {
                this.startDate(new Date());
            };
        };
      id: two
    - title: Using global options
      description: This example shows configuring global options for this widget
      view: |
        <div data-bind="kendoCalendar: startDate"> </div>
        <hr/>
        <button data-bind="click: setToToday">Set to Today</button>
        <hr/>
        <div data-bind="text: startDate"> </div>
      js: |
        var ViewModel = function() {
            this.startDate = ko.observable(new Date(2012,10,30));
            this.setToToday = function() {
                this.startDate(new Date());
            };
        };
        
        ko.bindingHandlers.kendoCalendar.options = {
            min: new Date(2012, 0, 1),
            max: new Date(2012, 11, 31)
        };
      id: three
      
liveOptions:
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
