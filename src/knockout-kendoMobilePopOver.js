createBinding({
    name: "kendoMobilePopOver",
    events: {
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
        isOpen: function(value, options) {
            if (!value) {
                //causes issues with event triggering, if closing programmatically, when unnecessary
                if (this.element.parent().is(":visible")) {
                    this.close();
                }
            } else {
                this.open($(options.target));
            }
        }
    },
    async: true
});