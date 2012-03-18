---
layout: default
prefix: ../
name: TreeView
description: The TreeView widget displays hierarchical data in a tree structure.
docs: http://demos.kendoui.com/web/treeview/index.html
examples:
    - title: Basic Example
      description: This is a basic example
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
      description: This is a sample that shows passing additional options in the data-bind attribute
      view: |
        <input type="checkbox" data-bind="checked: isOpen" /> Open<br/>
        <input type="checkbox" data-bind="checked: enabled" /> Enable
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
            <li data-bind="kendoTreeItem: { expanded: isOpen, enabled: enabled, selected: isSelected }">
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
            this.isSelected = ko.observable();
        };
      id: two
    - title: Using global options
      description: This example shows configuring global options for this widget
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
      
futurePlans: Better support for adding/inserting/removing nodes and responding to selections.
---

{% include widget.html %}
