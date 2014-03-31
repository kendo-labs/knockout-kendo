---
layout: default
prefix: ../
name: Upload
description: The Upload widget allows for a user-friendly experience for choosing files to upload.
docs: http://docs.telerik.com/kendo-ui/api/web/upload
examples:
    - title: Basic Example
      description: This example demonstrates initializing an Upload widget with no additional options specified.
      view: |
        <form method="post" data-bind="kendoUpload: {}">
            <div>
                <input name="files[]" type="file" />
            </div>
        </form>
      js: |
         var ViewModel = function() {};
      selected: true
      id: one
    - title: Passing additional options
      description: This example demonstrates passing additional options in the data-bind attribute.
      view: |
        <input type="checkbox" data-bind="checked: enabled" /> Enabled
        <hr/>
        <form method="post" data-bind="kendoUpload: { enabled: enabled }">
            <div>
                <input class="btn" name="files[]" type="file" />
            </div>
        </form>
      js: |
        var ViewModel = function() {
            this.enabled = ko.observable(true);
        };
      id: two
    - title: Using global options
      description: This example demonstrates setting global options in *ko.bindingHandlers.kendoUpload.options*. This helps to simplify the markup for settings that can be used as a default for all instances of this widget.
      view: |
        <form method="post" data-bind="kendoUpload: {}">
            <div>
                <input name="files[]" type="file" />
            </div>
        </form>
      js: |
        var ViewModel = function() {};
        
        ko.bindingHandlers.kendoUpload.options.multiple = false;
      id: three
liveOptions:
    - name: enabled
      description: Determines if users can interact with the field

futurePlans:
---

{% include widget.html %}
