---
layout: default
prefix: ../
name: Splitter
description: The Splitter widget allows for resizable panels that can be collapsed.
docs: http://docs.telerik.com/kendo-ui/api/web/splitter
examples:
    - title: Basic Example
      description: This example demonstrates initializing a Splitter widget with no additional options specified.
      view: |
        <div data-bind="kendoSplitter: {}">
            <div>Pane One</div>
            <div>Pane Two</div>
        </div>
      js: |
         var ViewModel = function() {};
      selected: true
      id: one
    - title: Passing additional options
      description: This example demonstrates passing additional options in the data-bind attribute. The **kendoSplitterPane** binding can be applied to child elements to control the behavior of individual menu items.
      view: |
        <input data-bind="checked: isOpen" type="checkbox" /> Open<br/>
        <input class="span1" data-bind="value: minSize" /> Min 1<br/>
        <input class="span1" data-bind="value: maxSize" /> Max 1<br/>
        <input class="span1" data-bind="value: size" /> Size 1
        <hr/>
        <div data-bind="kendoSplitter: {}">
            <div data-bind="kendoSplitterPane: { expanded: isOpen, max: maxSize, min: minSize, size: size }">one</div>
            <div>two</div>
        </div>
      js: |
        var ViewModel = function() {
            this.isOpen = ko.observable(true);
            this.maxSize = ko.observable("200px");
            this.minSize = ko.observable("50px");
            this.size = ko.observable("100px");
        };
      id: two
    - title: Using global options
      description: This example demonstrates setting global options in *ko.bindingHandlers.kendoSplitter.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
        <div data-bind="kendoSplitter: {}">
            <div>Pane One</div>
            <div>Pane Two</div>
        </div>
      js: |
         var ViewModel = function() {};
         
         ko.bindingHandlers.kendoSplitter.options.orientation = "vertical";
      id: three
      
liveOptions:
    - name: expanded
      description: Controls whether the pane is expanded or collapsed
    - name: size
      description: The current size of the pane
    - name: max
      description: The maximum size of the pane
    - name: min
      description: The minimum size of the pane
      
futurePlans:
---

{% include widget.html %}
