;(function(factory) {
    // CommonJS
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        factory(require('knockout'), require('jquery'), require('kendo'));
        // AMD
    } else if (typeof define === 'function' && define.amd) {
        define(['knockout', 'jquery', 'kendo'], factory);
        // Normal script tag
    } else {
        factory(window.ko, window.jQuery, window.kendo);
    }
}(function(ko, $, kendo, undefined) {

//handle require.js scenarios where kendo is not actually returned
kendo = kendo || window.kendo;

//import "knockout-kendo-core.js"

//import "knockout-kendo-constants.js"

//import "knockout-kendoAutoComplete.js"

//import "knockout-kendoButton.js"

//import "knockout-kendoCalendar.js"

//import "knockout-kendoColorPicker.js"

//import "knockout-kendoComboBox.js"

//import "knockout-kendoDatePicker.js"

//import "knockout-kendoDateTimePicker.js"

//import "knockout-kendoDropDownList.js"

//import "knockout-kendoEditor.js"

//import "knockout-kendoGrid.js"

//import "knockout-kendoListView.js"

//import "knockout-kendoMaskedTextBox.js"

//import "knockout-kendoMenu.js"

//import "knockout-kendoMultiSelect.js"

//import "knockout-kendoNotification.js"

//import "knockout-kendoNumericTextBox.js"

//import "knockout-kendoPanelBar.js"

//import "knockout-kendoProgressBar.js"

//import "knockout-kendoRangeSlider.js"

//import "knockout-kendoScheduler.js"

//import "knockout-kendoSlider.js"

//import "knockout-kendoSplitter.js"

//import "knockout-kendoTabStrip.js"

//import "knockout-kendoTooltip.js"

//import "knockout-kendoTimePicker.js"

//import "knockout-kendoTreeView.js"

//import "knockout-kendoUpload.js"

//import "knockout-kendoWindow.js"

//import "knockout-kendoChart.js"

//import "knockout-kendoLinearGauge.js"

//import "knockout-kendoRadialGauge.js"

}));
