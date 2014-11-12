createBinding({
    name: "kendoMobileDrawer",
    events: {
        show: {
            writeTo: ISOPEN,
            value: true
        },
        hide: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        isOpen: function(value) {
            this[value ? "show" : "hide"]();
        }
    },
    async: true
});