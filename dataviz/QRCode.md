---
layout: default
prefix: ../
widgetName: QR Code
description: Generates a QR code based on data.
docs: http://demos.telerik.com/kendo-ui/qrcode/index
examples:
    - title: Basic Example
      description: This example demonstrates generating a basic QR Code.
      view: |
        <div data-bind="kendoQRCode: {
            value: selectedLink,
            errorCorrection: 'M',
            size: 160
        }"></div>
        <hr/>
        <input data-bind="kendoDropDownList: { data: links, value: selectedLink, dataTextField: 'name', dataValueField: 'url' }" />
      js: |
        var ViewModel = function() {
            this.selectedLink = ko.observable("http://knockoutjs.com");
            this.links = ko.observableArray([
                { url: "http://knockoutjs.com", name: "Knockout" },
                { url: "http://kendo-labs.github.io/knockout-kendo/index.html", name: "KO-Kendo" },
                { url: "http://demos.telerik.com/kendo-ui/", name: "Kendo UI" }
            ]);
        };
      selected: true
      id: one

liveOptions:
    - name: value
      description: The value to use when generating the QR code
    - name: widget
      description: If specified, will populate an observable with a reference to the actual widget
      
futurePlans: Evaluate whether any individual options of the configuration objects should be watched specifically.
---

{% include widget.html %}
