createBinding({
    name: "kendoTooltip",
    events: {
        show: {
            writeTo: ISOPEN,
            value: true
        },
        hide: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        show: SHOW,
        hide: HIDE,
        target: TARGET
    }
});