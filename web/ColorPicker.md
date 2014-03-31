---
layout: default
prefix: ../
name: ColorPicker
description: The ColorPicker is a drop-down widget for selecting colors. It's designed to replace a HTML5 color field, which is not yet widely supported in browsers, with a user-friendly interface.
docs: http://docs.telerik.com/kendo-ui/api/web/colorpicker
examples:
    - title: Basic Example
      description: This example demonstrates passing the basic options required by the ColorPicker plugin.
      view: |
        <input data-bind="kendoColorPicker: { palette: colorPalette, value: selectedChoice }" />
        <hr/>
        Selected: <strong data-bind="text: selectedChoice"> </strong>
      js: |
         var ViewModel = function() {
            this.colorPalette = ko.observable("basic");
            this.selectedChoice = ko.observable("#ffffff");
         };
      selected: true
      id: one
    - title: Passing additional options
      description: This example demonstrates binding against objects for the source data and specifying the property to use for the value. The *addChoice* button also shows that the choices are kept in sync as the observableArray bound to the data receives new items.
      view: |
        <input type="checkbox" data-bind="checked: isEnabled" /> Enabled<br/>
        <hr/>
        <button class="btn" data-bind="click: addChoice">Add Choice</button>
        <hr/>
        <input data-bind="kendoColorPicker: { palette: colorPalette, value: selectedChoice, enabled: isEnabled }" />
        <hr/>
        Selected: <strong data-bind="text: selectedChoice"> </strong>

      js: |
        var ViewModel = function() {
            this.colorPalette = ko.observableArray([
                "#f0d0c9", "#e2a293", "#d4735e", "#65281a",
                "#eddfda", "#dcc0b6", "#cba092", "#7b4b3a",
                "#fcecd5", "#f9d9ab", "#f6c781", "#c87d0e",
                "#e1dca5", "#d0c974", "#a29a36", "#514d1b",
                "#c6d9f0", "#8db3e2", "#548dd4", "#17365d"
            ]);

            this.selectedChoice = ko.observable("#17365d");
            this.isEnabled = ko.observable(true);
            this.addChoice = function() {
                this.choices.push("#ddd");
            };
        };
      id: two
    - title: Using global options
      description: This example demonstrates the ability to configure options globally by setting properties in *ko.bindingHandlers.kendoColorPicker.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
        <input data-bind="kendoColorPicker: { palette: colorPalette, value: selectedChoice }" />
        <hr/>
        Selected: <strong data-bind="text: selectedChoice"> </strong>
      js: |
         var ViewModel = function() {
            this.colorPalette = ko.observable("websafe");
            this.selectedChoice = ko.observable("#fff");
         };
         
         //search text by what it contains rather than what is starts with
         ko.bindingHandlers.kendoColorPicker.options = {
            titleSize: 20
         };
      id: three
      
liveOptions:
    - name: enabled
      description: Determines if users can interact with the field
    - name: value
      description: The value of the field as selected by the user or set in the view model
    - name: color
      description: A color object representing the currently-selected item
    - name: palette
      description: the color palette ("websafe", "basic" or an array of values) to display.
      
futurePlans:
---

{% include widget.html %}
