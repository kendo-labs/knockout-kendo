---
layout: default
prefix: ../
name: Upload
description: The Upload widget allows for a user-friendly experience for choosing files to upload.
docs: http://demos.kendoui.com/web/upload/index.html
examples:
    - title: Basic Example
      description: This is a basic example
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
      description: This is a sample that shows passing additional options in the data-bind attribute
      view: |
        <input type="checkbox" data-bind="checked: enabled" /> Enabled
        <hr/>
        <form method="post" data-bind="kendoUpload: { enabled: enabled }">
            <div>
                <input name="files[]" type="file" />
            </div>
        </form>
      js: |
        var ViewModel = function() {
            this.enabled = ko.observable(true);
        };
      id: two
    - title: Using global options
      description: This example shows configuring global options for this widget
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
