---
layout: default
prefix: ../
name: MaskedTextBox
description: The MaskedTextBox widget can restrict the type of input allowed by a user.
docs: http://docs.telerik.com/kendo-ui/api/web/maskedtextbox
examples:
    - title: Basic Example
      description: This example demonstrates passing a single option to bind against the value of the MaskedTextBox widget.
      view: |
        <input data-bind="kendoMaskedTextBox: value" />
        <hr/>
        <div data-bind="text: value"> </div>
      js: |
        var ViewModel = function() {
            this.value = ko.observable("test");
        };
      selected: true
      id: one
    - title: Passing additional options
      description: This example demonstrates passing additional options in the data-bind attribute with *value* now being explicitly specified.
      view: |
        <input data-bind="kendoMaskedTextBox: { value: value, mask: '0,000.00 $' }" />
        <hr/>
        <div data-bind="text: value"> </div>
      js: |
        var ViewModel = function() {
            this.value = ko.observable("");
        };
      id: two
    - title: Using global options
      description: This example demonstrates setting global options in *ko.bindingHandlers.kendoMaskedTextBox.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
        <input data-bind="kendoDatePicker: value" />
        <hr/>
        <div data-bind="text: value"> </div>
      js: |
        var ViewModel = function() {
            this.value = ko.observable("");
        };
        
        ko.bindingHandlers.kendoMaskedTextBox.options = {
            mask: '0,000.00 $'
        };
      id: three
      
liveOptions:
    - name: enabled
      description: Determines if users can interact with the field
    - name: isReadOnly
      description: Controls whether the field allows input
    - name: value
      description: The current value of the field
    - name: widget
      description: If specified, will populate an observable with a reference to the actual widget

futurePlans:
---

{% include widget.html %}
