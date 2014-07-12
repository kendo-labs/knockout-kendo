---
layout: default
prefix: ../
name: Chart
description: Sparklines are simple, word-sized graphics that can be embedded in text, tables or headlines.
docs: http://demos.telerik.com/kendo-ui/sparklines/index
examples:
    - title: Basic Example
      description: This example demonstrates generating a basic sparkline.
      view: |
        <span data-bind="kendoSparkline: { data: items, series: [{ name: 'sample', field: 'value' }] }"> </span>
      js: |
        var ViewModel = function() {
            this.items = [
                { name: "one", value: 10 },
                { name: "two", value: 20},
                { name: "three", value: 30 }
            ];
        };
      selected: true
      id: one
    - title: Passing additional options
      description: This example demonstrates generating a sparkline with some additional options specified.
      view: |
        <input data-bind="value: newValue" class="span1" />
        <input data-bind="value: newValueB" class="span1" />
        <button data-bind="click: addItem">Add data</button>
        <hr />
        <div data-bind="kendoSparkline: { data: items, title: { text: 'Graph Sample' }, series: seriesConfig, seriesColors: ['blue', 'red'] }"> </div>
      js: |
        var ViewModel = function() {
            this.items = ko.observableArray([
                { name: "one", value: 10, valueB: 5 },
                { name: "two", value: 20, valueB: 8 },
                { name: "three", value: 30, valueB: 14 }
            ]);

            this.seriesConfig = [
                { name: 'sample A', field: 'value' },
                { name: 'sample B', field: 'valueB' }
            ]

            this.newValue = ko.observable(40);
            this.newValueB = ko.observable(10);

            this.addItem = function() {
                this.items.push({ name: "new", value: this.newValue(), valueB: this.newValueB() });
            };
        };
      id: two
    - title: Using global options
      description: This example demonstrates generating a line chart and customizing the series colors by setting the *seriesColor* property in *ko.bindingHandlers.kendoChart.options*.
      view: |
        <input data-bind="value: newValue" class="span1" />
        <input data-bind="value: newValueB" class="span1" />
        <button data-bind="click: addItem">Add data</button>
        <hr />
        <div data-bind="kendoChart: { data: items, series: seriesConfig }"> </div>
      js: |
        var ViewModel = function() {
            this.items = ko.observableArray([
                { name: "one", value: 10, valueB: 5 },
                { name: "two", value: 20, valueB: 8 },
                { name: "three", value: 30, valueB: 14 }
            ]);

            this.seriesConfig = [
                { name: 'sample A', field: 'value', type: 'line' },
                { name: 'sample B', field: 'valueB', type: 'line' }
            ]

            this.newValue = ko.observable(40);
            this.newValueB = ko.observable(10);

            this.addItem = function() {
                this.items.push({ name: "new", value: this.newValue(), valueB: this.newValueB() });
            };
        };

        ko.bindingHandlers.kendoChart.options = {
            seriesColors: ["blue", "red"],
            plotArea: { background: '#ccc' },
            title: { text: 'Graph Sample' }
        };
      id: three
      
liveOptions:
    - name: data
      description: An observableArray or kendo.data.dataSource to use in the chart
    - name: widget
      description: If specified, will populate an observable with a reference to the actual widget
      
futurePlans: Possibly adding additional live options to observe other configuration choices and refresh the chart.
---

{% include widget.html %}
