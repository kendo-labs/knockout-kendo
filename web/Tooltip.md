---
layout: default
prefix: ../
name: Tooltip
description: A Tooltip displays popup hint for a given html element. Its content can be defined either as static text or loaded dynamically via AJAX.
docs: http://docs.kendoui.com/getting-started/web/tooltip/overview
examples:
    - title: Basic Example
      description: This example demonstrates passing basic options to the Tooltip plugin.
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
      description: This example demonstrates passing the filter option.
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
    - name: content
      description: The content of the tooltip
    - name: filter
      description: a filter selector that specifies the source of the tooltip texts
      
futurePlans:
---

{% include widget.html %}
