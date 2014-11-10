createBinding({
    name: "kendoMobileTabStrip",
    events: {
        select: function(options, event) {
            if (ko.isWriteableObservable(options.selectedIndex)) {
                options.selectedIndex(event.item.index());
            }
        }
    },
    watch: {
        selectedIndex: function(value) {
            if (value || value === 0) {
                this.switchTo(value);
            }
        }
    }
});