---
layout: default
prefix: ../
name: ListView
description: The ListView widget allows for a custom layout of a collection
docs: http://demos.kendoui.com/web/listview/index.html
examples:
    - title: Basic Example
      description: This is a basic example
      view: |
        <div data-bind="kendoListView: { data: items, template: template }"> </div>
      js: |
        var ViewModel = function() {
            this.items = ko.observableArray([
                { id: "1", name: "apple"},
                { id: "2", name: "orange"},
                { id: "3", name: "banana"}
            ]);
            this.template = kendo.template('<div>#= name #</div>');
        };
      selected: true
      id: one
    - title: Passing additional options
      description: This is a sample that shows passing additional options in the data-bind attribute
      view: |
        <div data-bind="kendoListView: { data: items, navigatable: true, selectable: true, value: selected, template: template }"> </div>
        <div data-bind="text: selected"> </div>
        <button data-bind="click: addItem">Add Item</button>
      js: |
        var ViewModel = function() {
            this.items = ko.observableArray([
                { id: "1", name: "apple"},
                { id: "2", name: "orange"},
                { id: "3", name: "banana"}
            ]);
            this.template = kendo.template('<div>#= name #</div>');
            this.selected = ko.observable();
            
            this.addItem = function() {
                var num = this.items().length + 1;
                this.items.push({ id: num, name: "new" + num});
            };
        };
      id: two
    - title: Using global options
      description: This example shows configuring global options for this widget
      view: |
        <div data-bind="kendoGrid: items"> </div>
        <button data-bind="click: addItem">Add Item</button>
      js: |
      view: |
        <div data-bind="kendoListView: { data: items, value: selected, template: template }"> </div>
        <div data-bind="text: selected"> </div>
        <button data-bind="click: addItem">Add Item</button>
      js: |
        var ViewModel = function() {
            this.items = ko.observableArray([
                { id: "1", name: "apple"},
                { id: "2", name: "orange"},
                { id: "3", name: "banana"}
            ]);
            
            this.template = kendo.template('<div>#= name #</div>');
            this.selected = ko.observable();
            
            this.addItem = function() {
                var num = this.items().length + 1;
                this.items.push({ id: num, name: "new" + num});
            };
        };
        
        ko.bindingHandlers.kendoListView.options = {
            navigatable: true,
            selectable: true
        };
        
      id: three
      
liveOptions:
    - name: data
      description: An array or observableArray of data to be rendered in the list
    - name: widget
      description: If specified, will populate an observable with a reference to the actual widget
      
futurePlans: Exploring tighter integration with templates and dataSource to allow Knockout data binding to work inside items along with support for selecting items.
---

{% include widget.html %}
