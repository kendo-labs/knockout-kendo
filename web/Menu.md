---
layout: default
prefix: ../
name: Menu
description: The Menu widget displays a hierarchical menu that allows navigation and selection.
docs: http://demos.kendoui.com/web/menu/index.html
examples:
    - title: Basic Example
      description: This is a basic example
      view: |
        <ul data-bind="kendoMenu: {}">
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
        <input type="checkbox" data-bind="checked: isOpen" /> Open<br/>
        <input type="checkbox" data-bind="checked: enabled" /> Enable
        <hr/>
        <ul data-bind="kendoMenu: {}">
            <li>
                <span>Test 1</span>
                <ul>
                    <li>
                        <span>Test 1A</span>
                        <ul>
                            <li>Test 1Aa</li>
                            <li>Test 1Ab</li>
                        </ul>
                    </li>
                    <li>Test 1B</li>
                </ul>
            </li>
            <li data-bind="kendoMenuItem: { isOpen: isOpen, enabled: enabled }">
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
        <input type="checkbox" data-bind="checked: isOpen" /> Open<br/>
        <input type="checkbox" data-bind="checked: enabled" /> Enable
        <hr/>
        <ul data-bind="kendoMenu: {}">
            <li>
                <span>Test 1</span>
                <ul>
                    <li>
                        <span>Test 1A</span>
                        <ul>
                            <li>Test 1Aa</li>
                            <li>Test 1Ab</li>
                        </ul>
                    </li>
                    <li>Test 1B</li>
                </ul>
            </li>
            <li data-bind="kendoMenuItem: { isOpen: isOpen, enabled: enabled }">
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
        
        ko.bindingHandlers.kendoMenu.options.orientation = "vertical";
      id: three
      
liveOptions:
    - name: enabled
      description: Determines if users can interact with the menu item
    - name: isOpen
      description: Indicates whether the menu item is expanded or closed
    - name: widget
      description: If specified, will populate an observable with a reference to the actual widget
      
futurePlans:
---

{% include widget.html %}
