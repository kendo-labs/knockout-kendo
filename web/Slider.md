---
layout: default
prefix: ../
name: Slider
description: The Slider widget allows a user to select a single value from a range.
docs: http://docs.telerik.com/kendo-ui/api/web/slider
examples:
    - title: Basic Example
      description: This example demonstrates passing a single option to bind against the value of the Slider widget.
      view: |
        <input data-bind="kendoSlider: myValue" />
        <hr/>
        Value: <strong data-bind="text: myValue"> </strong>
      js: |
         var ViewModel = function() {
            this.myValue = ko.observable(4);
         };
      selected: true
      id: one
    - title: Passing additional options
      description: This example demonstrates passing additional options in the data-bind attribute with *value* now being explicitly specified. The *Set to 50* button makes an update to the view model to show that the widget responds accordingly.
      view: |
        <input data-bind="checked: enabled" type="checkbox" /> Enabled<br/>
        <button data-bind="click: setToDefault">Set to 50</button>
        <hr/>
        <input data-bind="kendoSlider: { value: myValue, enabled: enabled, min: 0, max: 100 }" />
        <hr/>
        Value: <strong data-bind="text: myValue"> </strong>
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
      description: This example demonstrates setting global options in *ko.bindingHandlers.kendoSlider.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
        <input data-bind="kendoSlider: myValue" />
        <hr/>
        Value: <strong data-bind="text: myValue"> </strong>
      js: |
        var ViewModel = function() {
            this.myValue = ko.observable(40);
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
