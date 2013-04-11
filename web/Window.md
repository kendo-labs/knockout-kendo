---
layout: default
prefix: ../
name: Window
description: The Window widget displays content in a modal or non-modal HTML window. 
docs: http://demos.kendoui.com/web/window/index.html
examples:
    - title: Basic Example
      description: This example demonstrates passing basic options to the Window plugin.
      view: |
          <input type="checkbox" data-bind="checked: isOpen" /> Open<br/>
          <div data-bind="kendoWindow: { isOpen: isOpen, visible: false }">
              Window Content
          </div>
      js: |
         var ViewModel = function() {
            this.isOpen = ko.observable(false);
         };
      selected: true
      id: one
    - title: Passing additional options
      description: This example demonstrates passing additional options in the data-bind attribute.
      view: |
          <input type="checkbox" data-bind="checked: isOpen" /> Open<br/>
          <div data-bind="kendoWindow: { isOpen: isOpen, visible: false, actions: ['Close', 'Minimize', 'Maximize', 'Refresh'], modal: true }">
                Window Content
          </div>
      js: |
         var ViewModel = function() {
            this.isOpen = ko.observable(false);
         };
      id: two
    - title: Using global options
      description: This example demonstrates setting global options in *ko.bindingHandlers.kendoWindow.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
          <input type="checkbox" data-bind="checked: isOpen" /> Open<br/>
          <div data-bind="kendoWindow: { isOpen: isOpen }">
              Window Content
          </div>
      js: |
         var ViewModel = function() {
            this.isOpen = ko.observable(false);
         };
         
         ko.bindingHandlers.kendoWindow.options = {
            actions: ['Close', 'Minimize', 'Maximize', 'Refresh'],
            modal: true,
            visible: false
         };
      id: three
      
liveOptions:
    - name: isOpen
      description: Controls whether the window is visible
    - name: title
      description: Determinies the title of the window
    - name: content
      description: A URL to load content into the window
      
futurePlans:
---

{% include widget.html %}
