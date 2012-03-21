---
layout: default
prefix: ../
name: Grid
description: The Grid widget offers allows a user to interact with tabular data.
docs: http://demos.kendoui.com/web/grid/index.html
examples:
    - title: Basic Example
      description: This example demonstrates passing a single option to bind data against the Grid widget.
      view: |
        <div data-bind="kendoGrid: items"> </div>
      js: |
        var ViewModel = function() {
            this.items = ko.observableArray([
                { id: "1", name: "apple"},
                { id: "2", name: "orange"},
                { id: "3", name: "banana"}
            ]);
        };
      selected: true
      id: one
    - title: Passing additional options
      description: This example demonstrates passing additional options in the data-bind attribute with *data* now being explicitly specified. The *Add Item* button updates the underlying data and shows that the Grid remains in sync.
      view: |
        <div data-bind="kendoGrid: { data: items, groupable: true, scrollable: true, sortable: true, pageable: true }"> </div>
        <button data-bind="click: addItem">Add Item</button>
      js: |
        var ViewModel = function() {
            this.items = ko.observableArray([
                { id: "1", name: "apple"},
                { id: "2", name: "orange"},
                { id: "3", name: "banana"}
            ]);

            this.addItem = function() {
                var num = this.items().length + 1;
                this.items.push({ id: num, name: "new" + num});
            };
        };
      id: two
    - title: Using global options
      description: This example demonstrates setting global options in *ko.bindingHandlers.kendoGrid.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
        <div data-bind="kendoGrid: items"> </div>
        <button data-bind="click: addItem">Add Item</button>
      js: |
        var ViewModel = function() {
            this.items = ko.observableArray([
                { id: "1", name: "apple"},
                { id: "2", name: "orange"},
                { id: "3", name: "banana"}
            ]);

            this.addItem = function() {
                var num = this.items().length + 1;
                this.items.push({ id: num, name: "new" + num});
            };
            
            ko.bindingHandlers.kendoGrid.options = {
                groupable: true,
                scrollable: true,
                sortable: true,
                pageable: true
            };
        };
      id: three
      
liveOptions:
    - name: data
      description: An array or observableArray of data to use in the grid
    - name: widget
      description: If specified, will populate an observable with a reference to the actual widget
      
futurePlans: Exploring tighter integration with templates and dataSource to allow Knockout data binding to work inside cells including editable cells.
---

{% include widget.html %}
