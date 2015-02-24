createBinding({
    name: "kendoGantt",
    defaultOption: DATA,
    watch: {
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        }
    }
});