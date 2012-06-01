createBinding({
    async: true,
    name: "kendoWindow",
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
        content: CONTENT,
        title: TITLE,
        isOpen: [OPEN, CLOSE]
    }
});