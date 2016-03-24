var schedulerUpdateModel = function(func) {
    return function(options, e) {
        var allModels = unwrap(options.data || options.dataSource),
            idField = unwrap(options.idField) || "id",
            model = ko.utils.arrayFirst(allModels, function(item) {
                return unwrap(item[idField]) === e.event[idField];
            }),
            write = function(data) {
                for (var prop in model) {
                    if (data.hasOwnProperty(prop) && model.hasOwnProperty(prop)) {
                        var value = data[prop],
                            writeTo = model[prop];

                        if (ko.isWriteableObservable(writeTo)) {
                            writeTo(value);
                        }
                    }
                }
            };

        if (model) {
            func(options, e, model, write);
        }
    };
};

createBinding({
    name: "kendoScheduler",
    events: {
        moveEnd: schedulerUpdateModel(function(options, e, model, write) {
            write(e);
            write(e.resources);
        }),
        save: schedulerUpdateModel(function(options, e, model, write) {
            write(e.event);
        }),
        remove: function(options, e) {
            var match;
            var data = options.data || options.dataSource;
            var unwrapped = ko.unwrap(data);

            if (unwrapped && unwrapped.length) {
                match = ko.utils.arrayFirst(ko.unwrap(data), function(item) {
                    return item.uuid === e.event.uuid;
                });

                if (match) {
                    ko.utils.arrayRemoveItem(unwrapped, match);

                    if (ko.isWriteableObservable(data)) {
                        data.valueHasMutated();
                    }
                }
            }
        }
    },
    watch: {
        data: function(value, options) {
            ko.kendo.setDataSource(this, value, options);
        },
        date: DATE
    },
    async: true
});