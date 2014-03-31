---
layout: default
prefix: ../
name: ProgressBar
description: The ProgressBar widget displays a status bar that can animate between values
docs: http://docs.telerik.com/kendo-ui/api/web/progressbar
examples:
    - title: Basic Example
      description: This example demonstrates passing a single option to bind against the value of the ProgressBar widget.
      view: |
        <div data-bind="kendoProgressBar: percent"> </div>
        <hr/>
        <input data-bind="value: percent" />
      js: |
        var ViewModel = function() {
            this.percent = ko.observable(25);
        };
      selected: true
      id: one
    - title: Passing additional options
      description: This example demonstrates passing additional options in the data-bind attribute with *value* now being explicitly specified.
      view: |
        <div data-bind="kendoProgressBar: { value: percent, enabled: enabled }"> </div>
        <hr/>
        <input data-bind="value: percent" /><br/>
        <input type="checkbox" data-bind="checked: enabled" />
      js: |
        var ViewModel = function() {
            this.enabled = ko.observable(true);
            this.percent = ko.observable(25);
        };
      id: two
      
liveOptions:
    - name: enabled
      description: Determines if users can interact with the progress bar
    - name: value
      description: The current value of the progress bar
    - name: widget
      description: If specified, will populate an observable with a reference to the actual widget

futurePlans:
---

{% include widget.html %}
