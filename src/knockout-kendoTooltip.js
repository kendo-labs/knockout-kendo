createBinding({
    name: "kendoTooltip",
    events: {},
    watch: {
        content: function(content) {
            this.options.content = content;
            this.refresh();
        },
        filter: FILTER
    }
});
