createBinding({
    name: "kendoLinearGauge",
    defaultOption: VALUE,
    watch: {
        value: VALUE,
        gaugeArea: extendAndRedraw("gaugeArea"),
        pointer: extendAndRedraw("pointer"),
        scale: extendAndRedraw("scale")
    }
});