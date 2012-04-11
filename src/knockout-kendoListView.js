createBinding({
    name: "kendoListView",
    defaultOption: DATA,
    watch: {
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        }
    },
    templates: ["template", "editTemplate"]
});