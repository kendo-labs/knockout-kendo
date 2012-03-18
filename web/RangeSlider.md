---
layout: default
prefix: ../
name: RangeSlider
description: The RangeSlider widget allows a user to choose a start and end to a range of values.
docs: http://demos.kendoui.com/web/slider/index.html
examples:
    - title: Basic Example
      description: This is a basic example
      view: |
        <div data-bind="kendoRangeSlider: myValues">
            <input />
            <input />
        </div>
        <hr/>
        <div data-bind="text: myValues"> </div>
      js: |
         var ViewModel = function() {
            this.myValues = ko.observableArray([2, 6]);
         };
      selected: true
      id: one
    - title: Passing additional options
      description: This is a sample that shows passing additional options in the data-bind attribute
      view: |
        <input data-bind="checked: enabled" type="checkbox" /><br/>
        <button data-bind="click: setToDefault">Set to Default</button>
        <hr/>
        <div data-bind="kendoRangeSlider: { values: myValues, enabled: enabled, min: 0, max: 100 }">
            <input />
            <input />
        </div>
        <hr/>
        <div data-bind="text: myValues"> </div>
      js: |
        var ViewModel = function() {
            this.myValues = ko.observableArray([20, 80]);
            this.enabled = ko.observable(true);
            this.setToDefault  = function() {
                this.myValues([40, 60]);
            };
        };
      id: two
    - title: Using global options
      description: This example shows configuring global options for this widget
      view: |
        <input data-bind="checked: enabled" type="checkbox" /><br/>
        <button data-bind="click: setToDefault">Set to Default</button>
        <hr/>
        <div data-bind="kendoRangeSlider: { values: myValues, enabled: enabled, min: 0, max: 100 }">
            <input />
            <input />
        </div>
        <hr/>
        <div data-bind="text: myValues"> </div>
      js: |
        var ViewModel = function() {
            this.myValues = ko.observableArray([20, 80]);
            this.enabled = ko.observable(true);
            this.setToDefault  = function() {
                this.myValues([40, 60]);
            };
        };
        
        ko.bindingHandlers.kendoRangeSlider.options = {
            min: 0,
            max: 100
        };
      id: three
      
liveOptions:
    - name: enabled
      description: Determines if users can interact with the slider
    - name: values
      description: An array or observableArray containing the two selected values (upper and lower) 

futurePlans:
---

{% include widget.html %}
