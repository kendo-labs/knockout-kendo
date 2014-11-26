---
layout: default
prefix: ../
widgetName: Scheduler
description: The Scheduler widget provides a flexible calendar-based editor.
docs: http://demos.kendoui.com/web/grid/index.html
examples:
    - title: Basic Example
      description: This example demonstrates passing various options to the scheduler widget.
      view: |
        <div data-bind="kendoScheduler: config"> </div>
      js: |
        var ViewModel = function() {
            this.config = {
                date: new Date("2013/6/13"),
                startTime: new Date("2013/6/13 10:00"),
                endTime: new Date("2013/6/13 23:00"),
                height: 600,
                views: ["day", "agenda"],
                editable: false,
                dataSource: [
                    {
                        title: "Fast and furious 6",
                        image: "../../content/web/scheduler/fast-and-furious.jpg",
                        imdb: "http://www.imdb.com/title/tt1905041/",
                        start: new Date("2013/6/13 17:00"),
                        end: new Date("2013/6/13 18:30")
                    },
                    {
                        title: "The Internship",
                        image: "../../content/web/scheduler/the-internship.jpg",
                        imdb: "http://www.imdb.com/title/tt2234155/",
                        start: new Date("2013/6/13 14:00"),
                        end: new Date("2013/6/13 15:30")
                    },
                    {
                        title: "The Perks of Being a Wallflower",
                        image: "../../content/web/scheduler/wallflower.jpg",
                        imdb: "http://www.imdb.com/title/tt1659337/",
                        start: new Date("2013/6/13 16:00"),
                        end: new Date("2013/6/13 17:30")
                    },
                    {
                        title: "The Help",
                        image: "../../content/web/scheduler/the-help.jpg",
                        imdb: "http://www.imdb.com/title/tt1454029/",
                        start: new Date("2013/6/13 12:00"),
                        end: new Date("2013/6/13 13:30")
                    },
                    {
                        title: "Now You See Me",
                        image: "../../content/web/scheduler/now-you-see-me.jpg",
                        imdb: "http://www.imdb.com/title/tt1670345/",
                        start: new Date("2013/6/13 10:00"),
                        end: new Date("2013/6/13 11:30")
                    },
                    {
                        title: "Fast and furious 6",
                        image: "../../content/web/scheduler/fast-and-furious.jpg",
                        imdb: "http://www.imdb.com/title/tt1905041/",
                        start: new Date("2013/6/13 19:00"),
                        end: new Date("2013/6/13 20:30")
                    },
                    {
                        title: "The Internship",
                        image: "../../content/web/scheduler/the-internship.jpg",
                        imdb: "http://www.imdb.com/title/tt2234155/",
                        start: new Date("2013/6/13 17:30"),
                        end: new Date("2013/6/13 19:00")
                    },
                    {
                        title: "The Perks of Being a Wallflower",
                        image: "../../content/web/scheduler/wallflower.jpg",
                        imdb: "http://www.imdb.com/title/tt1659337/",
                        start: new Date("2013/6/13 17:30"),
                        end: new Date("2013/6/13 19:00")
                    },
                    {
                        title: "The Help",
                        image: "../../content/web/scheduler/the-help.jpg",
                        imdb: "http://www.imdb.com/title/tt1454029/",
                        start: new Date("2013/6/13 13:30"),
                        end: new Date("2013/6/13 15:00")
                    },
                    {
                        title: "Now You See Me",
                        image: "../../content/web/scheduler/now-you-see-me.jpg",
                        imdb: "http://www.imdb.com/title/tt1670345/",
                        start: new Date("2013/6/13 12:30"),
                        end: new Date("2013/6/13 14:00")
                    }
                ]
            };
        };
      selected: true
      id: one
      
liveOptions:
    - name: data
      description: An array, observableArray, or kendo.data.DataSource to use in the scheduler
    - name: widget
      description: If specified, will populate an observable with a reference to the actual widget

futurePlans:
    - will look to bring better Knockout integration inside of the scheduler widget
---

{% include widget.html %}
