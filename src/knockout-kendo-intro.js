(function(factory) {
    // CommonJS
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        factory(require('knockout'), require('jquery'));
    // AMD
    } else if (typeof define === 'function' && define.amd) {
        define(['knockout', 'jquery'], factory);
    // Normal script tag
    } else {
        factory(window.ko, window.jQuery);
    }
}(function(ko, $, undefined) {
