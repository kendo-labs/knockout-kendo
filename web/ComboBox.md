---
layout: default
prefix: ../
name: ComboBox
description: The ComboBox widget allows a user to select from a list of values or enter a custom value.
docs: http://docs.telerik.com/kendo-ui/api/web/combobox
examples:
    - title: Basic Example
      description: This example demonstrates passing the basic options required by the ComboBox plugin.
      view: |
        <input data-bind="kendoComboBox: { data: choices, value: selectedChoice }" />
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
      description: This example demonstrates binding against objects for the source data and specifying the properties to use for displaying in the field and for the value. The *addChoice* button shows that the ComboBox is kept in sync as the observableArray bound to the data receives new items.
      view: |
        <button data-bind="click: open, disable: isOpen">Open</button>
        <input type="checkbox" data-bind="checked: enabled" /> Enable<br/>
        <hr/>
        <input data-bind="kendoComboBox: { dataTextField: 'name', dataValueField: 'id', data: choices, value: selectedChoice, isOpen: isOpen, enabled: enabled }" />
        <hr/>
        Selected: <strong data-bind="text: selectedChoice"> </strong>
        <hr/>
        <button data-bind="click: addChoice">Add New Choice</button>
      js: |
        var ViewModel = function() {
            this.choices = ko.observableArray([
                { id: "1", name: "apple"},
                { id: "2", name: "orange"},
                { id: "3", name: "banana"}
            ]);

            this.selectedChoice = ko.observable();
            this.enabled = ko.observable(true);
            this.isOpen = ko.observable(false);
            this.open = function() {
                this.isOpen(true);
            };
            this.addChoice = function() {
                var num = this.choices().length + 1;
                this.choices.push({ id: num, name: "new" + num});
            };
        };
      id: two
    - title: Using global options
      description: This example demonstrates the ability to configure options globally by setting properties in *ko.bindingHandlers.kendoComboBox.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
        <input data-bind="kendoComboBox: { data: choices, value: selectedChoice }" />
        <hr/>
        Selected: <strong data-bind="text: selectedChoice"> </strong>
      js: |
         var ViewModel = function() {
            this.choices = ko.observableArray(["apple", "orange", "banana"]);
            this.selectedChoice = ko.observable();
         };
         
         ko.bindingHandlers.kendoComboBox.options.highlightFirst = false;
         
      id: three
      
liveOptions:
    - name: data
      description: The source of data that is used for the dropdown options
    - name: enabled
      description: Determines if users can interact with the field
    - name: isOpen
      description: Indicates whether the selection box is open or closed
    - name: value
      description: The current selected value
    - name: widget
      description: If specified, will populate an observable with a reference to the actual widget
      
futurePlans:
---

{% include widget.html %}
