---
layout: default
prefix: ../
widgetName: Editor
description: The Editor widget allows users to create and edit HTML in an user friendly interface.
docs: http://docs.telerik.com/kendo-ui/api/web/editor
examples:
    - title: Basic Example
      description: This example demonstrates passing a single option to bind against the value of the Editor widget.
      view: |
        <textarea rows="10" cols="20" data-bind="kendoEditor: content" > </textarea>
        <hr/>
        <div data-bind="text: content"> </div>
      js: |
         var ViewModel = function() {
            this.content = ko.observable("this is a <strong>test</strong>!");
         };
      selected: true
      id: one
    - title: Passing additional options
      description: This example demonstrates passing additional options in the data-bind attribute with *content* now being explicitly specified.
      view: |
        <textarea rows="10" cols="20" data-bind="kendoEditor: { value: content, tools: ['bold', 'italic'] }" > </textarea>
        <hr/>
        <div data-bind="text: content"> </div>
      js: |
         var ViewModel = function() {
            this.content = ko.observable("this is a <strong>test</strong>!");
         };
      id: two
    - title: Using global options
      description: This example demonstrates setting global options in *ko.bindingHandlers.kendoEditor.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
        <textarea rows="10" cols="20" data-bind="kendoEditor: content" > </textarea>
        <hr/>
        <div data-bind="text: content"> </div>
      js: |
         var ViewModel = function() {
            this.content = ko.observable("this is a <strong>test</strong>!");
         };
         
         ko.bindingHandlers.kendoEditor.options.tools = ['bold', 'italic'];        
      id: three
      
liveOptions:
    - name: enabled
      description: Determines if users can interact with the editor
    - name: value
      description: The HTML output of the editor
    - name: widget
      description: If specified, will populate an observable with a reference to the actual widget
      
futurePlans:
---

{% include widget.html %}
