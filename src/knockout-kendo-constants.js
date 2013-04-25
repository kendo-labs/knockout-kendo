//library is in a closure, use this private variable to reduce size of minified file
var createBinding = ko.kendo.bindingFactory.createBinding.bind(ko.kendo.bindingFactory);

//use constants to ensure consistency and to help reduce minified file size
var CLOSE = "close",
    COLLAPSE = "collapse",
    CONTENT = "content",
    DATA = "data",
    ENABLE = "enable",
    EXPAND = "expand",
    ENABLED = "enabled",
    EXPANDED = "expanded",
    FILTER = "filter",
    HIDE = "hide",
    ISOPEN = "isOpen",
    MAX = "max",
    MIN = "min",
    OPEN = "open",
    PALETTE = "palette",
    RESIZE = "resize",
    SEARCH = "search",
    SELECT = "select",
    SELECTED = "selected",
    SHOW = "show",
    SIZE = "size",
    TARGET = "target",
    TITLE = "title",
    VALUE = "value",
    VALUES = "values";
