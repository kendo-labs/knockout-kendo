createBinding({
    name: "kendoGrid",
    defaultOption: DATA,
    watch: {
        data: function(value, options) {
            ko.kendo.setDataSource(this, value, options);
        }
    },
    templates: ["rowTemplate", "altRowTemplate", "template", "detailTemplate",
            "headerTemplate", "footerTemplate", "groupHeaderTemplate", "groupFooterTemplate"]
});