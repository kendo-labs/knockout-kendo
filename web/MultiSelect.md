---
layout: default
prefix: ../
name: MultiSelect
description: The MultiSelect displays a list of values and allows the selection of multiple values from this list.
docs: http://docs.kendoui.com/getting-started/web/multiselect/overview
examples:
    - title: Basic Example
      description: This example demonstrates passing the basic options required by the MultiSelect plugin.
      view: |
        <input data-bind="kendoMultiSelect: { data: choices, value: selectedChoice }" />
        <hr/>
        Selected: <strong data-bind="text: selectedChoice"> </strong>
      js: |
         var ViewModel = function() {
            this.choices = ko.observableArray(["apple", "orange", "banana"]);
            this.selectedChoice = ko.observable();
         };
      selected: true
      id: one
    - title: Passing additional options
      description: This example demonstrates binding against objects for the source data and specifying the property to use for the value. The *addChoice* button also shows that the choices are kept in sync as the observableArray bound to the data receives new items.
      view: |
        <input type="checkbox" data-bind="checked: isEnabled" /> Enabled<br/>
        <input class="search-query" data-bind="value: search, valueUpdate: 'afterkeydown'" placeholder="enter search term" /><br/>
        <hr/>
        <button class="btn" data-bind="click: addChoice">Add Choice</button>
        <hr/>
        <input data-bind="kendoMultiSelect: { dataTextField: 'name', data: choices,
                       value: selectedChoice, search: search, enabled: isEnabled }" />
        <hr/>
        Selected: <strong data-bind="text: selectedChoice"> </strong>

      js: |
        var ViewModel = function() {
            this.choices = ko.observableArray([
                { id: "1", name: "apple"},
                { id: "2", name: "orange"},
                { id: "3", name: "banana"}
            ]);

            this.selectedChoice = ko.observable();
            this.isEnabled = ko.observable(true);
            this.search = ko.observable();
            this.addChoice = function() {
                var num = this.choices().length + 1;
                this.choices.push({ id: num, name: "new" + num});
            };
        };
      id: two
    - title: Using global options
      description: This example demonstrates the ability to configure options globally by setting properties in *ko.bindingHandlers.kendoMultiSelect.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
        <input data-bind="kendoMultiSelect: { data: choices, value: selectedChoice }" />
        <hr/>
        Selected: <strong data-bind="text: selectedChoice"> </strong>
      js: |
         var ViewModel = function() {
            this.choices = ko.observableArray(["apple", "orange", "banana"]);
            this.selectedChoice = ko.observable();
         };
         
         //search text by what it contains rather than what is starts with
         ko.bindingHandlers.kendoMultiSelect.options.filter = "contains";
      id: three
      
liveOptions:
    - name: enabled
      description: Determines if users can interact with the field
    - name: value
      description: The value of the field as selected by the user or set in the view model
    - name: data
      description: An array or observableArray of options
    - name: search
      description: When the value bound to this is updated, a search will be performed based on its value
    - name: widget
      description: If specified, will populate an observable with a reference to the actual widget
      
futurePlans:
---

{% include widget.html %}
