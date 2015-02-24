createBinding({
    name: "kendoButton",
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