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

            //if nothing is selected and there is an optionLabel, select it
            if (value.length && this.options.optionLabel && this.select() < 0) {
                this.select(0);
            }
        },
        value: VALUE
    }
});