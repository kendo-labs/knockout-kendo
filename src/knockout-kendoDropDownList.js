createBinding({
    name: "kendoDropDownList",
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
    watch: {
        enabled: ENABLE,
        isOpen: [OPEN, CLOSE],
        data: function(value) {
            ko.kendo.setDataSource(this, value);
                if (value.length > 0) {
                        if (this.options.optionLabel !== null) {
                                this.select(0);
                        }
                }
        },
        value: VALUE
    }
});