createBinding({
    name: "kendoTreeMap",
    watch: {
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        }
    }
});