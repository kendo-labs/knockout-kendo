createBinding({
    name: "kendoPivotGrid",
    watch: {
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        }
    }
});