createBinding({
    name: "kendoSparkline",
    watch: {
        data: function (value) {
            ko.kendo.setDataSource(this, value);
        }
    }
});
