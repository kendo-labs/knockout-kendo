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

//import "knockout-kendoGantt.js"

//import "knockout-kendoGrid.js"

//import "knockout-kendoListView.js"

//import "knockout-kendoPager.js"

//import "knockout-kendoMaskedTextBox.js"

//import "knockout-kendoMap.js"

//import "knockout-kendoMenu.js"

//import "knockout-kendoMobileActionSheet.js"

//import "knockout-kendoMobileButton.js"

//import "knockout-kendoMobileButtonGroup.js"

//import "knockout-kendoMobileDrawer.js"

//import "knockout-kendoMobileListView.js"

//import "knockout-kendoMobileModalView.js"

//import "knockout-kendoMobileNavBar.js"

//import "knockout-kendoMobilePopOver.js"

//import "knockout-kendoMobileScroller.js"

//import "knockout-kendoMobileScrollView.js"

//import "knockout-kendoMobileSwitch.js"

//import "knockout-kendoMobileTabStrip.js"

//import "knockout-kendoMultiSelect.js"

//import "knockout-kendoNotification.js"

//import "knockout-kendoNumericTextBox.js"

//import "knockout-kendoPanelBar.js"

//import "knockout-kendoPivotGrid.js"

//import "knockout-kendoProgressBar.js"

//import "knockout-kendoRangeSlider.js"

//import "knockout-kendoScheduler.js"

//import "knockout-kendoSlider.js"

//import "knockout-kendoSortable.js"

//import "knockout-kendoSplitter.js"

//import "knockout-kendoTabStrip.js"

//import "knockout-kendoToolBar.js"

//import "knockout-kendoTooltip.js"

//import "knockout-kendoTimePicker.js"

//import "knockout-kendoTreeMap.js"

//import "knockout-kendoTreeView.js"

//import "knockout-kendoUpload.js"

//import "knockout-kendoWindow.js"

//import "knockout-kendoBarcode.js"

//import "knockout-kendoChart.js"

//import "knockout-kendoLinearGauge.js"

//import "knockout-kendoQRCode.js"

//import "knockout-kendoRadialGauge.js"

//import "knockout-kendoSparkline.js"

//import "knockout-kendoStockChart.js"

}));
