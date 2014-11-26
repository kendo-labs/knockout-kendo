---
layout: default
prefix: ../
widgetName: Button
description: The Button widget provides a theme-able and flexible button
docs: http://docs.telerik.com/kendo-ui/api/web/button
examples:
    - title: Basic Example
      description: This example demonstrates passing a single option to bind against the value of the Button widget.
      view: |
        <button data-bind="kendoButton: increment">Increment</button>
        <hr/>
        <div data-bind="text: count"> </div>
      js: |
        var ViewModel = function() {
            this.count = ko.observable(0);
            this.increment = function() {
                this.count(this.count() + 1);
            };
        };
      selected: true
      id: one
    - title: Passing additional options
      description: This example demonstrates passing additional options in the data-bind attribute with *clicked* now being explicitly specified.
      view: |
        <input type="checkbox" data-bind="checked: enabled" /><br/>
        <hr/>
        <button data-bind="kendoButton: { clicked: increment, enabled: enabled }">Increment</button>
        <hr/>
        <div data-bind="text: count"> </div>
      js: |
        var ViewModel = function() {
            this.enabled = ko.observable(true);
            this.count = ko.observable(0);
            this.increment = function() {
                this.count(this.count() + 1);
            };
        };
      id: two
      
liveOptions:
    - name: enabled
      description: Determines if users can interact with the button
    - name: clicked
      description: Attach a handler to execute when the button is clicked
    - name: widget
      description: If specified, will populate an observable with a reference to the actual widget

futurePlans:
---

{% include widget.html %}
