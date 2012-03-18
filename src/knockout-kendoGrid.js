createBinding({
    name: "kendoGrid",
    defaultOption: DATA,
    watch: {
        data: function(value) {
            this.dataSource.data(value);
        }
    }
});