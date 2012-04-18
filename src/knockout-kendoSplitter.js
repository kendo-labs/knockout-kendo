createBinding({
    name: "kendoSplitter",
    async: true
});

createBinding({
    name: "kendoSplitterPane",
    parent: "kendoSplitter",
    watch: {
        max: MAX,
        min: MIN,
        size: SIZE,
        expanded: [EXPAND, COLLAPSE]
    },
    childProp: "pane",
    events: {
        collapse: {
            writeTo: EXPANDED,
            value: false
        },
        expand: {
            writeTo: EXPANDED,
            value: true
        },
        resize: SIZE
    },
    async: true
});