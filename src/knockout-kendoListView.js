createBinding({
    name: "kendoListView",
    defaultOption: DATA,
    watch: {
        data: function(value, options) {
            ko.kendo.setDataSource(this, value, options);
        }
    },
    templates: ["template"]
});