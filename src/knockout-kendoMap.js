createBinding({
    name: "kendoMap",
    events: {
        zoomEnd: function (options, event) {
            if (ko.isWriteableObservable(options.zoom)) {
                options.zoom(event.sender.zoom());
            }
        },
        panEnd: function (options, event) {
            var coordinates;

            if (ko.isWriteableObservable(options.center)) {
                coordinates = event.sender.center();

                options.center([coordinates.lat, coordinates.lng]);
            }
        }
    },
    watch: {
        center: CENTER,
        zoom: ZOOM
    }
});