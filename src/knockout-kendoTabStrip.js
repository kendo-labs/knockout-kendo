createBinding({
    name: "kendoTabStrip",
    async: true
});

createBinding({
    name: "kendoTab",
    parent: "kendoTabStrip",
    watch: {
        enabled: ENABLE
    },
    childProp: "item",
    async: true
});