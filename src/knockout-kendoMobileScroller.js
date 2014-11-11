createBinding({
    name: "kendoMobileScroller",
    events: {
        pull: function(options, event) {
            var doneCallback = event.sender.pullHandled.bind(event.sender);

            if (typeof options.pulled === "function") {
                options.pulled.call(this, this, event, doneCallback);
            }
        }
    },
    watch: {
        enabled: [ENABLE, DISABLE]
    }
});