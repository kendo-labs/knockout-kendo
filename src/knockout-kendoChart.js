createBinding({
    name: "kendoChart",
    watch: {
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        }
    }
});