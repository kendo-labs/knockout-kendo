createBinding({
    name: "kendoListView",
    defaultOption: DATA,
    optionsFilter: ko.kendo.dataOptionFilter,
    watch: {
        data: ko.kendo.setDataSource
    }
});