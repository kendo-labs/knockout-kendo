---
layout: default
prefix: ../
name: Calendar
description: The Calendar widget provides a visual calendar that supports navigation.
docs: http://docs.telerik.com/kendo-ui/api/web/calendar
examples:
    - title: Basic Example
      description: This example demonstrates passing a single option to bind against the value of the Calendar widget.
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
      description: This example demonstrates passing additional options in the data-bind attribute with *value* now being explicitly specified. The *setToToday* button makes an update to the view model to show that the widget responds accordingly.
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
      description: This example demonstrates setting global options in *ko.bindingHandlers.kendoCalendar.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
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
    - title: Accessing the widget
      description: This example demonstrates calling methods of the widget from the view model.
      view: |
        <div data-bind="kendoCalendar: { value: startDate, widget: calendar }"> </div>
        <hr/>
        <button data-bind="click: goPast">Navigate to Past</button><br/>
        <button data-bind="click: goFuture">Navigate to Future</button>
        <hr/>
        <div data-bind="text: startDate"> </div>
      js: |
        var ViewModel = function() {
            this.startDate = ko.observable(new Date(2012,10,30));
            this.calendar = ko.observable();
            this.goPast = function() {
                this.calendar().navigateToPast();
            };
            this.goFuture = function() {
                this.calendar().navigateToFuture();
            };
        };

        ko.bindingHandlers.kendoCalendar.options = {};
      id: four
      
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
