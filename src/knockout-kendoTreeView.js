createBinding({
    name: "kendoTreeView",
    async: true
});

createBinding({
    name: "kendoTreeItem",
    parent: "kendoTreeView",
    watch: {
        enabled: ENABLE,
        expanded: [EXPAND, COLLAPSE],
        selected: function(element, value) {
            if (value) {
                this.select(element);
            } else if (this.select()[0] == element) {
                this.select(null);
            }
        }
    },
    childProp: "node",
    events: {
        collapse: {
            writeTo: EXPANDED,
            value: false
        },
        expand: {
            writeTo: EXPANDED,
            value: true
        },
        select: {
            writeTo: SELECTED,
            value: true
        }
    },
    async: true
});
