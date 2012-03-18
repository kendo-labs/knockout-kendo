---
layout: default
prefix: ../
name: AutoComplete
description: The AutoComplete widget offers suggestions as a user types that can come from a local or remote data.
docs: http://demos.kendoui.com/web/autocomplete/index.html
examples:
    - title: Basic Example
      description: This is a basic example
      view: |
        <input data-bind="kendoAutoComplete: { data: choices, value: selectedChoice }" />
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
        <input type="checkbox" data-bind="checked: isEnabled" /> Enabled<br/>
        <input class="search-query" data-bind="value: search, valueUpdate: 'afterkeydown'" placeholder="enter search term" /><br/>
        <button class="btn" data-bind="click: addChoice">Add Choice</button>
        <hr/>
        <input data-bind="kendoAutoComplete: { dataTextField: 'name', data: choices,
                       value: selectedChoice, search: search, enabled: isEnabled }" />
        <hr/>
        <div data-bind="text: selectedChoice"> </div>

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
      description: This example shows configuring global options for the AutoComplete widget
      view: |
        <input data-bind="kendoAutoComplete: { data: choices, value: selectedChoice }" />
        <hr/>
        <div data-bind="text: selectedChoice"> </div>
      js: |
         var ViewModel = function() {
            this.choices = ko.observableArray(["apple", "orange", "banana"]);
            this.selectedChoice = ko.observable();
         };
         
         //search text by what it contains rather than what is starts with
         ko.bindingHandlers.kendoAutoComplete.options.filter = "contains";
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
