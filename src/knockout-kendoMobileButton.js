createBinding({
    name: "kendoMobileButton",
    defaultOption: CLICKED,
    events: {
        click: {
            call: CLICKED
        }
    },
    watch: {
        enabled: ENABLE
    }
});