---
layout: default
prefix: ../
name: DropDownList
description: The DropDownList widget allows a user to select a single value from a list.
docs: http://demos.kendoui.com/web/dropdownlist/index.html
examples:
    - title: Basic Example
      description: This is a basic example
      view: |
        <input data-bind="kendoDropDownList: { data: choices, value: selectedChoice }" />
        <hr/>
        <div data-bind="text: selectedChoice"> </div>
      js: |
         var ViewModel = function() {
            this.choices = ko.observableArray(["apple", "orange", "banana"]);
            this.selectedChoice = ko.observable();
         };
      selected: true
      id: one
    - title: Passing additional options
      description: This is a sample that shows passing additional options in the data-bind attribute
      view: |
        <input type="checkbox" data-bind="checked: isOpen" /> Open<br/>
        <input type="checkbox" data-bind="checked: enabled" /> Enable<br/>
        <hr/>
        <input data-bind="kendoDropDownList: { dataTextField: 'name', dataValueField: 'id', data: choices, value: selectedChoice, isOpen: isOpen, enabled: enabled }" />
        <hr/>
        <div data-bind="text: selectedChoice"> </div>
        <hr/>
        <select data-bind="options: choices, optionsText: 'name', optionsValue: 'id', value: selectedChoice"> </select>
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
            this.addChoice = function() {
                var num = this.choices().length + 1;
                this.choices.push({ id: num, name: "new" + num});
            };
        };
      id: two
    - title: Using global options
      description: This example shows configuring global options for this widget
      view: |
        <input data-bind="kendoDropDownList: { data: choices, value: selectedChoice }" />
        <hr/>
        <div data-bind="text: selectedChoice"> </div>
      js: |
         var ViewModel = function() {
            this.choices = ko.observableArray(["apple", "orange", "banana"]);
            this.selectedChoice = ko.observable();
         };
         
         ko.bindingHandlers.kendoDropDownList.options.optionLabel = "choose a fruit...";
         
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
