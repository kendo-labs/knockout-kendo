---
layout: default
prefix: ../
name: ListView
description: The ListView widget allows for a custom layout of a collection
docs: http://demos.kendoui.com/web/listview/index.html
examples:
    - title: Basic Example
      description: This example demonstrates passing the basic options required by the ListView plugin.
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
      description: This example demonstrates passing additional options in the data-bind attribute. The *Add Item* button updates the underlying data and shows that the ListView remains in sync.
      view: |
        <div data-bind="kendoListView: { data: items, navigatable: true, selectable: true, template: template }"> </div>
        <button data-bind="click: addItem">Add Item</button>
      js: |
        var ViewModel = function() {
            this.items = ko.observableArray([
                { id: "1", name: "apple"},
                { id: "2", name: "orange"},
                { id: "3", name: "banana"}
            ]);
            this.template = kendo.template('<div>#= name #</div>');
            
            this.addItem = function() {
                var num = this.items().length + 1;
                this.items.push({ id: num, name: "new" + num});
            };
        };
      id: two
    - title: Using Knockout templates
      description: This example demonstrates using a Knockout template for the list view row.
      view: |
        <div data-bind="kendoListView: { data: items, template: 'listTmpl', useKOTemplates: true }"> </div>

        <button data-bind="click: addItem">Add Item</button>

        <script id="listTmpl" type="text/html">
            <div>
                <span data-bind="text: id"></span>
                <input data-bind="value: name" />
                <a href="#" data-bind="click: $root.removeItem"> x </a>
            </div>
        </script>
      js: |
        var ViewModel = function() {
            this.items = ko.observableArray([
                { id: "1", name: ko.observable("apple")},
                { id: "2", name: ko.observable("orange")},
                { id: "3", name: ko.observable("banana")}
            ]);

            this.addItem = function() {
                var num = this.items().length + 1;
                this.items.push({ id: num, name: ko.observable("new" + num)});
            };

            this.removeItem = function(item) {
                this.items.remove(item);
            }.bind(this);
        };

      id: three
    - title: Using global options
      description: This example demonstrates setting global options in *ko.bindingHandlers.kendoListView.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
        <div data-bind="kendoListView: { data: items, template: template }"> </div>
        <button data-bind="click: addItem">Add Item</button>
      js: |
        var ViewModel = function() {
            this.items = ko.observableArray([
                { id: "1", name: "apple"},
                { id: "2", name: "orange"},
                { id: "3", name: "banana"}
            ]);
            
            this.template = kendo.template('<div>#= name #</div>');
            
            this.addItem = function() {
                var num = this.items().length + 1;
                this.items.push({ id: num, name: "new" + num});
            };
        };
        
        ko.bindingHandlers.kendoListView.options = {
            navigatable: true,
            selectable: true
        };
        
      id: four
      
liveOptions:
    - name: data
      description: An array or observableArray of data to be rendered in the list
    - name: widget
      description: If specified, will populate an observable with a reference to the actual widget
---

{% include widget.html %}
