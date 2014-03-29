createBinding({
    name: "kendoNumericTextBox",
    defaultOption: VALUE,
    events: {
        change: VALUE
    },
    watch: {
        enabled: ENABLE,
        value: VALUE,
        max: function(newMax) {
            this.options.max = newMax;
            //make sure current value is still valid
            if (this.value() > newMax) {
                this.value(newMax);
            }
        },
        min: function(newMin) {
            this.options.min = newMin;
            //make sure that current value is still valid
            if (this.value() < newMin) {
                this.value(newMin);
            }
        }
    }
});