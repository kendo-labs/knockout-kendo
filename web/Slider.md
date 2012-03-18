---
layout: default
prefix: ../
name: Slider
description: The Slider widget allows a user to select a single value from a range.
docs: http://demos.kendoui.com/web/slider/index.html
examples:
    - title: Basic Example
      description: This is a basic example
      view: |
        <input data-bind="kendoSlider: myValue" />
        <hr/>
        <div data-bind="text: myValue"> </div>
      js: |
         var ViewModel = function() {
            this.myValue = ko.observable(4);
         };
      selected: true
      id: one
    - title: Passing additional options
      description: This is a sample that shows passing additional options in the data-bind attribute
      view: |
        <input data-bind="checked: enabled" type="checkbox" /><br/>
        <button data-bind="click: setToDefault">Set to Default</button>
        <hr/>
        <input data-bind="kendoSlider: { value: myValue, enabled: enabled, min: 0, max: 100 }" />
        <hr/>
        <div data-bind="text: myValue"> </div>
      js: |
        var ViewModel = function() {
            this.myValue = ko.observable(40);
            this.enabled = ko.observable(true);
            this.setToDefault  = function() {
                this.myValue(50);
            };
        };
      id: two
    - title: Using global options
      description: This example shows configuring global options for this widget
      view: |
        <button data-bind="click: setToDefault">Set to Default</button>
        <input data-bind="kendoSlider: myValue" />
        <div data-bind="text: myValue"> </div>
      js: |
        var ViewModel = function() {
            this.myValue = ko.observable(40);
            this.setToDefault  = function() {
                this.myValue(50);
            };
        };
        
        ko.bindingHandlers.kendoSlider.options = {
            min: 0,
            max: 100
        };
      id: three
      
liveOptions:
    - name: enabled
      description: Determines if users can interact with the field
    - name: value
      description: The current value of the slider

futurePlans:
---

{% include widget.html %}
