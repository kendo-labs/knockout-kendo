createBinding({
    name: "kendoTreeView",
    watch: {
        data: function(value, options) {
            ko.kendo.setDataSource(this, value, options);
        }
    },
    events: {
        change: function(options, e) {
            if (ko.isWriteableObservable(options.value)) {
                var tree = e.sender;
                options.value(tree.dataItem(tree.select()));
            }
        }
    },
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
