---
layout: default
prefix: ../
widgetName: LinearGauge
description: The LinearGauge widget visually displays where a value lies in a range.
docs: http://demos.kendoui.com/dataviz/linear-gauge/index.html
examples:
    - title: Basic Example
      description: This example demonstrates displaying a basic linear gauge.
      view: |
        <input data-bind="value: myValue" class="input-mini" />
        <hr/>
        <div data-bind="kendoLinearGauge: myValue"> </div>
      js: |
        var ViewModel = function() {
            this.myValue = ko.observable(25);
        };
      selected: true
      id: one
    - title: Passing additional options
      description: This example demonstrates passing additinal configuration options to a linear gauge.
      view: |
          <input data-bind="value: myValue" class="input-mini" /> Value<br/>
          <select data-bind="options: colors, value: pointerColor" class="input-small"> </select> Pointer <br/>
          <select data-bind="options: colors, value: backgroundColor" class="input-small"> </select> Background
          <hr/>
          <div data-bind="kendoLinearGauge: { value: myValue, gaugeArea: gaugeOptions, pointer: pointerOptions }"> </div>

      js: |
        var ViewModel = function() {
            this.myValue = ko.observable(25);

            this.colors = ['blue', 'red', 'yellow', 'green', 'orange', 'purple', 'white'];

            this.backgroundColor = ko.observable('white');
            this.pointerColor = ko.observable('black');

            this.gaugeOptions = ko.computed(function() {
                return { background: this.backgroundColor() };
            }, this);

            this.pointerOptions = ko.computed(function() {
                return { color: this.pointerColor(), value: this.myValue() };
            }, this);
        };
      id: two
    - title: Using global options
      description: This example demonstrates generating a linear gauge and customizing the appearance by setting options globally in *ko.bindingHandlers.kendoLinearGauge.options*.
      view: |
          <input data-bind="value: myValue" class="input-mini" />
          <div data-bind="kendoLinearGauge: myValue"> </div>

      js: |
        var ViewModel = function() {
            this.myValue = ko.observable(0);
        };

        ko.bindingHandlers.kendoLinearGauge.options = {
            gaugeArea: { background: 'gray' },
            scale: { vertical: false }
        };
      id: three
      
liveOptions:
    - name: value
      description: The current value of the gauge
    - name: gaugeArea
      description: An object containing the *gaugeArea* options
    - name: pointer
      description: An object containing the *pointer* options
    - name: scale
      description: An object containing the *scale* options
    - name: widget
      description: If specified, will populate an observable with a reference to the actual widget
      
futurePlans: Evaluate whether any individual options of the configuration objects should be watched specifically.
---

{% include widget.html %}
