---
layout: default
prefix: ../
name: Notification
description: The Notification widget allows for pop-up messages to appear on-demand.
docs: http://docs.telerik.com/kendo-ui/api/web/notification
examples:
    - title: Basic Example
      description: This example demonstrates displaying the various types of notifications.
      view: |
        <label><input data-bind="value: info" /> Info</label><br/>
        <label><input data-bind="value: warning" /> Warning</label><br/>
        <label><input data-bind="value: success" /> Success</label><br/>
        <label><input data-bind="value: error" /> Error</label><br/>
        <button data-bind="click: clear">Clear All</button>
        <span data-bind="kendoNotification: { info: info, warning: warning, success: success, error: error }"></span>
      js: |
        var ViewModel = function() {
            this.info = ko.observable();
            this.warning = ko.observable();
            this.success = ko.observable();
            this.error = ko.observable();

            this.clear = function () {
                this.info(null);
                this.warning(null);
                this.success(null);
                this.error(null);
            };
        };
      selected: true
      id: one
    - title: Using global options
      description: This example demonstrates the ability to configure options globally by setting properties in *ko.bindingHandlers.kendoNotification.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
        <label><input data-bind="value: info" /> Info</label><br/>
        <label><input data-bind="value: warning" /> Warning</label><br/>
        <label><input data-bind="value: success" /> Success</label><br/>
        <label><input data-bind="value: error" /> Error</label><br/>
        <button data-bind="click: clear">Clear All</button>
        <span data-bind="kendoNotification: { info: info, warning: warning, success: success, error: error }"></span>
      js: |
        var ViewModel = function() {
            this.info = ko.observable();
            this.warning = ko.observable();
            this.success = ko.observable();
            this.error = ko.observable();

            this.clear = function () {
                this.info(null);
                this.warning(null);
                this.success(null);
                this.error(null);
            };
        };

        ko.bindingHandlers.kendoNotification.options = {
            height: 100,
            width: 200,
            position: {
                top: 10,
                right: 10
            },
            autoHideAfter: 30000
        };
      selected: false
      id: two
liveOptions:
    - name: error
      description: Displays an error notification when populated
    - name: info
      description: Displays a normal notification when populated
    - name: success
      description: Displays a success notification when populated
    - name: warning
      description: Displays a warning notification when populated

futurePlans:
---

{% include widget.html %}
