createBinding({
    name: "kendoPager",
    defaultOption: DATA,
    watch: {
        data: function (value, options) {
            ko.kendo.setDataSource(this, value, options);
        },
        page: "page"
    },
    templates: ["selectTemplate", "linkTemplate"]
});