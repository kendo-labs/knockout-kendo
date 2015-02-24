var schedulerUpdateModel = function(func) {
    return function(options, e) {
        var allModels = unwrap(options.data),
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
        remove: schedulerUpdateModel(function(options, e, model, write) {
            options.data.remove(model);
        })
    },
    watch: {
        data: function(value, options) {
            ko.kendo.setDataSource(this, value, options);
        },
        date: DATE
    },
    async: true
});