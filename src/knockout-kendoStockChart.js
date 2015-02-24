createBinding({
    name: "kendoStockChart",
    watch: {
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        }
    }
});