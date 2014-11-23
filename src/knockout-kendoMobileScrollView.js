createBinding({
    name: "kendoMobileScrollView",
    events: {
        change: function(options, event) {
            if ((event.page || event.page === 0) && ko.isWriteableObservable(options.currentIndex)) {
                options.currentIndex(event.page);
            }
        }
    },
    watch: {
        currentIndex: SCROLLTO,
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        }
    }
});