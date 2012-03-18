createBinding({
    name: "kendoMenu",
    async: true
});

createBinding({
    name: "kendoMenuItem",
    parent: "kendoMenu",
    watch: {
        enabled: ENABLE,
        isOpen: [OPEN, CLOSE]
    },
    async: true
});