describe("ko.bindingHandlers.kendoListView", function(){
    //standard cases
    ko.kendo.generateBindingSpecs("kendoListView", {
        html: "<div></div>",
        defaultValue: [{name: "test"}],
        newValue: [{name: "new"}],
        defaults: { selectable: true }
    });

    //additional kendoListView cases

});