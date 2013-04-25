createBinding({
    name: "kendoColorPicker",
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
        value: VALUE,
        color: VALUE,
        palette: PALETTE
    }
});