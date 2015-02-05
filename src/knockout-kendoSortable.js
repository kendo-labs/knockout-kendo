createBinding({
    name: "kendoSortable",
    defaultOption: DATA,
    events: {
        end: function(options, e) {
            var dataKey = "__ko_kendo_sortable_data__",
                data = e.action !== "receive" ? ko.dataFor(e.item[0]) : e.draggableEvent[dataKey],
                items = options.data,
                underlyingArray = options.data;

            //remove item from its original position
            if (e.action === "sort" || e.action === "remove") {
                underlyingArray.splice(e.oldIndex, 1);

                //keep track of the item between remove and receive
                if (e.action === "remove") {
                    e.draggableEvent[dataKey] = data;
                }
            }

            //add the item to its new position
            if (e.action === "sort" || e.action === "receive") {
                underlyingArray.splice(e.newIndex, 0, data);

                //clear the data we passed
                delete e.draggableEvent[dataKey];

                //we are moving the item ourselves via the observableArray, cancel the draggable and hide the animation
                e.sender._cancel();
            }

            //signal that the observableArray has changed now that we are done changing the array
            items.valueHasMutated();
        }
    }
});
