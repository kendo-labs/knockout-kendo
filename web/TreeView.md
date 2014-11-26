---
layout: default
prefix: ../
widgetName: TreeView
description: The TreeView widget displays hierarchical data in a tree structure.
docs: http://docs.telerik.com/kendo-ui/api/web/treeview
examples:
    - title: Basic Example
      description: This example demonstrates initializing a TreeView widget with no additional options specified.
      view: |
        <ul data-bind="kendoTreeView: {}">
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
      description: This example demonstrates passing additional options in the data-bind attribute. The **kendoTreeItem** binding can be applied to child elements to control the behavior of individual menu items.
      view: |
        <input type="checkbox" data-bind="checked: isTwoOpen" /> Open 2<br/>
        <input type="checkbox" data-bind="checked: twoEnabled" /> Enable 2
        <hr/>
        <ul data-bind="kendoTreeView: {}">
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
            <li data-bind="kendoTreeItem: { expanded: isTwoOpen, enabled: twoEnabled, selected: isSelected }">
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
            this.isTwoOpen = ko.observable(false);
            this.isSelected = ko.observable();
        };
      id: two
    - title: Using global options
      description: This example demonstrates setting global options in *ko.bindingHandlers.kendoTreeView.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
        <ul data-bind="kendoTreeView: {}">
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
        
        ko.bindingHandlers.kendoTreeView.options.animation = false;
      id: three
      
liveOptions:
    - name: expanded
      description: Controls whether the tree item's leaf is open
    - name: enabled
      description: Determines if users can interact with the tree item
    - name: selected
      description: Controls whether the tree item is selected
    - name: widget
      description: If specified, will populate an observable with a reference to the actual widget
      
futurePlans: Better support for adding/inserting/removing nodes and responding to selections.
---

{% include widget.html %}
