---
layout: default
prefix: ../
name: TabStrip
description: The TabStrip widget displays tabs that display associated content when selected.
docs: http://demos.kendoui.com/web/tabstrip/index.html
examples:
    - title: Basic Example
      description: This example demonstrates initializing a TabStrip widget with no additional options specified.
      view: |
        <div data-bind="kendoTabStrip: {}">
            <ul>
                <li class="k-state-active">tab one</li>
                <li>tab two</li>
                <li>tab three</li>
            </ul>
            <div>tab one content</div>
            <div>tab two content</div>
            <div>tab three content</div>
        </div>
      js: |
         var ViewModel = function() {};
      selected: true
      id: one
    - title: Passing additional options
      description: This example demonstrates passing additional options in the data-bind attribute. The **kendoTab** binding can be applied to child elements to control the behavior of individual menu items.
      view: |
        <input type="checkbox" data-bind="checked: isTwoOpen" /> Open 2<br/>
        <input type="checkbox" data-bind="checked: twoEnabled" /> Enabled 2
        <hr/>
        <div data-bind="kendoTabStrip: {}">
            <ul>
                <li class="k-state-active">tab one</li>
                <li data-bind="kendoTab: { enabled: twoEnabled, selected: isTwoOpen }">tab two</li>
                <li>tab three</li>
            </ul>
            <div>tab one content</div>
            <div>tab two content</div>
            <div>tab three content</div>
        </div>
      js: |
        var ViewModel = function() {
            this.isTwoOpen = ko.observable(false);
            this.twoEnabled = ko.observable(true);
        };
      id: two
    - title: Using global options
      description: This example demonstrates setting global options in *ko.bindingHandlers.kendoTabStrip.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
        <div data-bind="kendoTabStrip: {}">
            <ul>
                <li class="k-state-active">tab one</li>
                <li>tab two</li>
                <li>tab three</li>
            </ul>
            <div>tab one content</div>
            <div>tab two content</div>
            <div>tab three content</div>
        </div>
      js: |
        var ViewModel = function() {};
        
        ko.bindingHandlers.kendoTabStrip.animation = false;
      id: three
liveOptions:
    - name: enabled
      description: Determines if users can interact with the tab
    - name: selected
      description: Controls whether a tab is currently selected

futurePlans: Better support for selecting/deselecting tabs and data source integration.
---

{% include widget.html %}
