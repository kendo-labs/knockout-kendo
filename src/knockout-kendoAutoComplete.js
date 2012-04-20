createBinding({
    name: "kendoAutoComplete",
    events: {
        change: VALUE,
        open: {
            writeTo: ISOPEN,
            value: true
        },
        close: {
            writeTo: ISOPEN,
            value: false
        }
    },
    optionsFilter: ko.kendo.dataOptionFilter,
    watch: {
        enabled: ENABLE,
        search: [SEARCH, CLOSE],
        data: ko.kendo.setDataSource,
        value: VALUE
    }
});