---
layout: default
prefix: ../
name: TabStrip
description: The TabStrip widget displays tabs that display associated content when selected.
docs: http://demos.kendoui.com/web/tabstrip/index.html
examples:
    - title: Basic Example
      description: This is a basic example
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
      description: This is a sample that shows passing additional options in the data-bind attribute
      view: |
        <input type="checkbox" data-bind="checked: isOpen" /> Open<br/>
        <input type="checkbox" data-bind="checked: enabled" /> Enabled
        <hr/>
        <div data-bind="kendoTabStrip: {}">
            <ul>
                <li class="k-state-active">tab one</li>
                <li data-bind="kendoTab: { enabled: enabled, selected: isOpen }">tab two</li>
                <li>tab three</li>
            </ul>
            <div>tab one content</div>
            <div>tab two content</div>
            <div>tab three content</div>
        </div>
      js: |
        var ViewModel = function() {
            this.isOpen = ko.observable(false);
            this.enabled = ko.observable(true);
        };
      id: two
    - title: Using global options
      description: This example shows configuring global options for this widget
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

futurePlans: Better support for selecting/deselecting tabs and inserting/removing tabs.
---

{% include widget.html %}
