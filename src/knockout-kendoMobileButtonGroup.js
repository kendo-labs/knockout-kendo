createBinding({
    name: "kendoMobileButtonGroup",
    events: {
        select: function(options, event) {
            if (ko.isWriteableObservable(options.selectedIndex)) {
                options.selectedIndex(event.sender.current().index());
            }
        }
    },
    watch: {
        enabled: ENABLE,
        selectedIndex: SELECT
    }
});