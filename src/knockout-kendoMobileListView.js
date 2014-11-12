createBinding({
    name: "kendoMobileListView",
    defaultOption: DATA,
    events: {
        click: {
            call: CLICKED
        }
    },
    watch: {
        data: function(value, options) {
            ko.kendo.setDataSource(this, value, options);
        }
    },
    templates: ["template"]
});