createBinding({
    name: "kendoNumericTextBox",
    defaultOption: VALUE,
    events: {
        change: VALUE,
        spin: VALUE
    },
    watch: {
        enabled: ENABLE,
        value: VALUE,
        max: function(newMax) {
            this.options.max = newMax;
            //make sure current value is still valid
            var value = this.value();
            if ((value || value === 0) && value > newMax) {
                this.value(newMax);
            }
        },
        min: function(newMin) {
            this.options.min = newMin;
            //make sure that current value is still valid
            var value = this.value();
            if ((value || value === 0) && value < newMin ) {
                this.value(newMin);
            }
        }
    }
});
