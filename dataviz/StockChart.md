---
layout: default
prefix: ../
widgetName: Stock Chart
description: The Stock Chart widget is used for visualizing stock prices over time.
docs: http://demos.telerik.com/kendo-ui/financial/index
examples:
    - title: Basic Example
      description: This example demonstrates generating a basic stock chart.
      view: |
        <div data-bind="kendoStockChart: { data: items, dateField: 'Date',
            series: [{
                type: 'candlestick', 
                openField: 'Open', 
                highField: 'High',
                lowField: 'Low',
                closeField: 'Close'
            }],
            navigator: {
                series: {
                    type: 'area', field: 'Close'
                },
                select: {
                    from: '2000/01/03', to: '2000/01/07'
                }
            }
        }"> 
        </div>
      js: |
        var ViewModel = function() {
            this.items = [
                { Date: new Date("2000/01/03"), Open: 42, High: 42.13, Low: 39.81, Close: 40.5 },
                { Date: new Date("2000/01/04"), Open: 40, High: 41.23, Low: 39.75, Close: 41 },
                { Date: new Date("2000/01/05"), Open: 41, High: 42.23, Low: 40.38, Close: 42 },
                { Date: new Date("2000/01/06"), Open: 42, High: 43.13, Low: 41.68, Close: 43 },
                { Date: new Date("2000/01/07"), Open: 43, High: 43.03, Low: 39.38, Close: 40 }
            ];
        };      
      selected: true
      id: one
  
liveOptions:
    - name: data
      description: Data to use in the stock chart
    - name: widget
      description: If specified, will populate an observable with a reference to the actual widget
      
futurePlans: Possibly adding additional live options to observe other configuration choices and refresh the chart.
---

{% include widget.html %}
