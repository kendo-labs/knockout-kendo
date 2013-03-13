createBinding({
    name: "kendoPanelBar",
    async: true
});

createBinding({
    name: "kendoPanelItem",
    parent: "kendoPanelBar",
    watch: {
        enabled: ENABLE,
        expanded: [EXPAND, COLLAPSE]
    },
    childProp: "item",
    events: {
        expand: {
            writeTo: EXPANDED,
            value: true
        },
        collapse: {
            writeTo: EXPANDED,
            value: false
        }
    },
    async: true
});