---
layout: default
prefix: ../
widgetName: Sortable
description: The Sortable binding allows reordering items in an observableArray by drag and drop.
docs: http://docs.telerik.com/kendo-ui/api/web/sortable
examples:
    - title: Basic Example
      description: This example demonstrates initializing a Splitter widget with no additional options specified.
      view: |
        <ul data-bind="foreach: items, kendoSortable: items">
            <li class="item" data-bind="text: name"></li>
        </ul>
        <hr/>
        <div data-bind="foreach: items"><span data-bind="text: name"></span>,</div>
      js: |
         var ViewModel = function() {
            this.items = ko.observableArray([
                { name: "one" },
                { name: "two" },
                { name: "three" }
            ]);
         };
      selected: true
      id: one
    - title: Sorting between lists
      description: This example demonstrates two lists that items can be dragged within and between.
      view: |
        <ul class="ones" data-bind="foreach: itemsOne, kendoSortable: { data: itemsOne, connectWith: '.twos' }">
            <li class="item" data-bind="text: name"></li>
        </ul>

        <hr/><div data-bind="foreach: itemsOne"><span data-bind="text: name"></span>,</div><hr/>

        <ul class="twos" data-bind="foreach: itemsTwo, kendoSortable: { data: itemsTwo, connectWith: '.ones' }">
            <li class="item" data-bind="text: name"></li>
        </ul>

        <hr/><div data-bind="foreach: itemsTwo"><span data-bind="text: name"></span>,</div>
      js: |
        var ViewModel = function() {
            this.itemsOne = ko.observableArray([
                { name: "one" },
                { name: "two" },
                { name: "three" }
            ]);

            this.itemsTwo = ko.observableArray([
                { name: "four" },
                { name: "five" },
                { name: "six" }
            ]);
        };
      id: two
    - title: Using global options
      description: This example demonstrates setting global options in *ko.bindingHandlers.kendoSortable.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
        <ul class="items" data-bind="foreach: itemsOne, kendoSortable: itemsOne">
            <li class="item" data-bind="text: name"></li>
        </ul>

        <hr/><div data-bind="foreach: itemsOne"><span data-bind="text: name"></span>,</div><hr/>

        <ul class="items" data-bind="foreach: itemsTwo, kendoSortable: itemsTwo">
            <li class="item" data-bind="text: name"></li>
        </ul>

        <hr/><div data-bind="foreach: itemsTwo"><span data-bind="text: name"></span>,</div>
      js: |
        var ViewModel = function() {
            this.itemsOne = ko.observableArray([
                { name: "one" },
                { name: "two", sortable: true },
                { name: "three", sortable: true }
            ]);

            this.itemsTwo = ko.observableArray([
                { name: "four", sortable: true },
                { name: "five", sortable: true },
                { name: "six" }
            ]);
        };

        ko.bindingHandlers.kendoSortable.options = {
            connectWith: ".items",
            placeholder: function(element) {
                return element.clone().css({
                    "opacity": 0.3,
                    "border": "1px dashed #000000"
                });
            }
        };
      id: three
      
liveOptions:
    - name: data
      description: The items being sorted. This is assumed to be an observableArray. Items are spliced into and out of the array.
    - name: widget
      description: Return the sortable widget
      
futurePlans:
---

{% include widget.html %}
