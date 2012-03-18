createBinding({
    name: "kendoPanelBar",
    async: true
});

createBinding({
    name: "kendoPanelItem",
    parent: "kendoPanelBar",
    updateableOptions: [ENABLE],
    watch: {
        enabled: ENABLE,
        expanded: [EXPAND, COLLAPSE]
    },
    async: true
});