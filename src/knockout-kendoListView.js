createBinding({
    name: "kendoListView",
    defaultOption: DATA,
    optionsFilter: ko.kendo.dataSourceOptionFilter,
    watch: {
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        }
    }
});