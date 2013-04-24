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
         <div data-bind="kendoTooltip: { content: tipText }"></div>
      js: |
         var ViewModel = function() {
            this.tipText = "I am a tooltip!";
         };
      selected: true
      id: one
    - title: Using the Title Attribute
      description: This example demonstrates using the title attribute of a element for Tooltip content
      view: |
        <div data-bind="kendoTooltip" title="I am a tooltip!"></div>
      js: |
        var ViewModel = function() {};
      selected: false
      id: two
    - title: Specifying Filters
      description: This example demonstrates using the filter configuration option 
      view: |
          <div data-bind="kendoTooltip: { filter: tipFilter }">
            Some <a href="#" title="Some text">Content</a><br />
            Some <a href="#" title="Some other text">More</a> Content <br />
          </div>
      js: |
        var ViewModel = function() {
            this.tipFilter = "a[title]";
         };
      selected: falseid: three
    - title: Using global options
      description: This example demonstrates setting global options in *ko.bindingHandlers.kendoTooltip.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
          <div data-bind="kendoTooltip: { content: tipText }"></div>
      js: |
         var ViewModel = function() {
            this.tipText = "I am a tooltip!";
         };
         
         ko.bindingHandlers.kendoWindow.options = {
            autoHide: false,
            callout: true,
            height: 50,
            width: 250,
            position: "left"
         };
      selected: false
      id: four
      
liveOptions:
    - name: isOpen
      description: Controls whether the window is visible
    - name: title
      description: Determines the title of the window
    - name: content
      description: A URL to load content into the window
      
futurePlans:
---

{% include widget.html %}
