---
layout: default
prefix: ../
name: Editor
description: The Editor widget allows users to create and edit HTML in an user friendly interface.
docs: http://demos.kendoui.com/web/editor/index.html
examples:
    - title: Basic Example
      description: This is a basic example
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
      description: This is a sample that shows passing additional options in the data-bind attribute
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
      description: This example shows configuring global options for this widget
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
