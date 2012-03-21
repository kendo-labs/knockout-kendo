---
layout: default
prefix: ../
name: RangeSlider
description: The RangeSlider widget allows a user to choose a start and end to a range of values.
docs: http://demos.kendoui.com/web/slider/index.html
examples:
    - title: Basic Example
      description: This example demonstrates passing a single option to bind against the values array of the RangeSlider widget.
      view: |
        <div data-bind="kendoRangeSlider: myValues">
            <input />
            <input />
        </div>
        <hr/>
        Low: <strong data-bind="text: myValues()[0]"> </strong>&nbsp;
        High: <strong data-bind="text: myValues()[1]"> </strong>
      js: |
         var ViewModel = function() {
            this.myValues = ko.observableArray([2, 6]);
         };
      selected: true
      id: one
    - title: Passing additional options
      description: This example demonstrates passing additional options in the data-bind attribute with *values* now being explicitly specified. The *Set to 40, 60* button makes an update to the view model to show that the widget responds accordingly.
      view: |
        <input data-bind="checked: enabled" type="checkbox" /> Enabled<br/>
        <button data-bind="click: setToDefault">Set to 40, 60</button>
        <hr/>
        <div data-bind="kendoRangeSlider: { values: myValues, enabled: enabled, min: 0, max: 100 }">
            <input />
            <input />
        </div>
        <hr/>
        Low: <strong data-bind="text: myValues()[0]"> </strong>&nbsp;
        High: <strong data-bind="text: myValues()[1]"> </strong>
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
      description: This example demonstrates setting global options in *ko.bindingHandlers.kendoRangeSlider.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
        <input data-bind="checked: enabled" type="checkbox" /> Enabled<br/>
        <button data-bind="click: setToDefault">Set to 40, 60</button>
        <hr/>
        <div data-bind="kendoRangeSlider: { values: myValues, enabled: enabled, min: 0, max: 100 }">
            <input />
            <input />
        </div>
        <hr/>
        Low: <strong data-bind="text: myValues()[0]"> </strong>&nbsp;
        High: <strong data-bind="text: myValues()[1]"> </strong>
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
