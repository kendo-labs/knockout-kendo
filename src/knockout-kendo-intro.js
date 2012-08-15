(function(factory) {
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
