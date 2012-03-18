ko.bindingHandlers.stop = {
    init: function() {
        return { 'controlsDescendantBindings': true };
    }
};

ko.bindingHandlers.kendoTabStrip.options.animation = false;
ko.applyBindings({});

hljs.initHighlightingOnLoad();