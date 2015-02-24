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
        isOpen: openIfVisible
    },
    async: true
});