---
layout: default
prefix: ../
name: Splitter
description: The Splitter widget allows for resizable panels that can be collapsed.
docs: http://demos.kendoui.com/web/splitter/index.html
examples:
    - title: Basic Example
      description: This is a basic example
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
      description: This is a sample that shows passing additional options in the data-bind attribute
      view: |
        <input data-bind="checked: isOpen" type="checkbox" /> Open<br/>
        <input class="span1" data-bind="value: minSize" /> Min<br/>
        <input class="span1" data-bind="value: maxSize" /> Max<br/>
        <input class="span1" data-bind="value: size" /> Size
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
      description: This example shows configuring global options for this widget
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
