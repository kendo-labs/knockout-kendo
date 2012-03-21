---
layout: default
prefix: ../
name: Menu
description: The Menu widget displays a hierarchical menu that allows navigation and selection.
docs: http://demos.kendoui.com/web/menu/index.html
examples:
    - title: Basic Example
      description: This example demonstrates initializing a Menu widget with no additional options specified.
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
      description: This example demonstrates passing additional options in the data-bind attribute. The **kendoMenuItem** binding can be applied to child elements to control the behavior of individual menu items.
      view: |
        <input type="checkbox" data-bind="checked: twoIsOpen" /> Open 2<br/>
        <input type="checkbox" data-bind="checked: twoEnabled" /> Enable 2
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
            <li data-bind="kendoMenuItem: { isOpen: twoIsOpen, enabled: twoEnabled }">
                <span>Test2</span>
                <ul>
                    <li>Test 2A</li>
                    <li>Test 2B</li>
                </ul>
            </li>
        </ul>
      js: |
        var ViewModel = function() {
            this.twoEnabled = ko.observable(true);
            this.twoIsOpen = ko.observable(false);
        };
      id: two
    - title: Using global options
      description: This example demonstrates setting global options in *ko.bindingHandlers.kendoMenu.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
        <input type="checkbox" data-bind="checked: isOpen" /> Open 2<br/>
        <input type="checkbox" data-bind="checked: enabled" /> Enable 2
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
            <li data-bind="kendoMenuItem: { isOpen: twoIsOpen, twoEnabled: enabled }">
                <span>Test2</span>
                <ul>
                    <li>Test 2A</li>
                    <li>Test 2B</li>
                </ul>
            </li>
        </ul>
      js: |
        var ViewModel = function() {
            this.twoEnabled = ko.observable(true);
            this.twoIsOpen = ko.observable(false);
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
      
futurePlans: Better integration with data sources.
---

{% include widget.html %}
