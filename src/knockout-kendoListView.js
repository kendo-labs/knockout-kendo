createBinding({
    name: "kendoListView",
    defaultOption: DATA,
    watch: {
        data: function(value) {
            this.dataSource.data(value);
        }
    }
});