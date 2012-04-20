createBinding({
    name: "kendoGrid",
    defaultOption: DATA,
    optionsFilter: ko.kendo.dataOptionFilter,
    watch: {
        data: ko.kendo.setDataSource
    }
});