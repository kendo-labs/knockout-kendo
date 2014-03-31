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
        <input data-bind="kendoNotification: { info: info, warning: warning, success: success, error: error }" />
        <hr/>
        <label><input data-bind="value: info"> Info</label><br/>
        <label><input data-bind="value: warning"> Warning</label><br/>
        <label><input data-bind="value: success"> Success</label><br/>
        <label><input data-bind="value: error"> Error</label><br/>

      js: |
        var ViewModel = function() {
            this.info = ko.observable();
            this.warning = ko.observable();
            this.success = ko.observable();
            this.error = ko.observable();
        };
      selected: true
      id: one
      
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
