createBinding({
    async: true,
    name: "kendoScheduler",
    watch: {
        data: function(value, options) {
            ko.kendo.setDataSource(this, value, options);
        }
    }
});