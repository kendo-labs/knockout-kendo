---
layout: default
prefix: ../
name: PanelBar
description: The PanelBar widget displays hierarchical data in expandable sections.
docs: http://demos.kendoui.com/web/panelbar/index.html
examples:
    - title: Basic Example
      description: This is a basic example
      view: |
        <ul data-bind="kendoPanelBar: {}">
            <li>
                <span>Test 1</span>
                <ul>
                    <li>Test 1A</li>
                    <li>Test 1B</li>
                </ul>
            </li>
            <li>
                <span>Test2</span>
                <ul>
                    <li>Test 2A</li>
                    <li>Test 2B</li>
                </ul>
            </li>
        </ul>
      js: |
         var ViewModel = function() {};
      selected: true
      id: one
    - title: Passing additional options
      description: This is a sample that shows passing additional options in the data-bind attribute
      view: |
        <input data-bind="checked: isOpen" type="checkbox" /> Open<br/>
        <input data-bind="checked: enabled" type="checkbox" /> Enabled
        <hr/>
        <ul data-bind="kendoPanelBar: {}">
            <li data-bind="kendoPanelItem: { expanded: isOpen, enabled: enabled }">
                <span>Test 1</span>
                <ul>
                    <li>Test 1A</li>
                    <li>Test 1B</li>
                </ul>
            </li>
            <li>
                <span>Test2</span>
                <ul>
                    <li>Test 2A</li>
                    <li>Test 2B</li>
                </ul>
            </li>
        </ul>
      js: |
        var ViewModel = function() {
            this.enabled = ko.observable(true);
            this.isOpen = ko.observable(false);
        };
      id: two
    - title: Using global options
      description: This example shows configuring global options for this widget
      view: |
        <ul data-bind="kendoPanelBar: {}">
            <li>
                <span>Test 1</span>
                <ul>
                    <li>Test 1A</li>
                    <li>Test 1B</li>
                </ul>
            </li>
            <li>
                <span>Test2</span>
                <ul>
                    <li>Test 2A</li>
                    <li>Test 2B</li>
                </ul>
            </li>
        </ul>
      js: |
        var ViewModel = function() {};
        
        ko.bindingHandlers.kendoPanelBar.options.expandMode = "single";
      id: three
      
liveOptions:
    - name: enabled
      description: Determines if users can interact with the panel item
    - name: expanded
      description: Indicates whether the panel bar item is expanded or closed
    - name: widget
      description: If specified, will populate an observable with a reference to the actual widget
      
futurePlans: Exploring tighter integration with templates and dataSource to allow Knockout data binding to work inside items along with support for selecting items.
---

{% include widget.html %}
