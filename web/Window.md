---
layout: default
prefix: ../
name: Window
description: The AutoComplete widget offers suggestions as a user types that can come from a local or remote data.
docs: http://demos.kendoui.com/web/window/index.html
examples:
    - title: Basic Example
      description: This is a basic example
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
      description: This is a sample that shows passing additional options in the data-bind attribute
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
      description: This example shows configuring global options for this widget
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
