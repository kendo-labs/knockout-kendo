createBinding({
    name: "kendoMobileSwitch",
    events: {
        change: function(options, event) {
            if (ko.isWriteableObservable(options.checked)) {
                options.checked(event.checked);
            }
        }
    },
    watch: {
        enabled: ENABLE,
        checked: CHECK
    }
});