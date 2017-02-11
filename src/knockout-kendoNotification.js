var notificationHandler = function(type, value) {
    if (value || value === 0) {
		if (typeof value === "object") {
			this.show(value, type);
		}
		else{
			try{
				this.show($.parseJSON(value), type);
			}
			catch(e) {
				// JSON parsing probably failed.  Maybe just a plain string?
				this.show(value, type);
			}
		}
    }
    else {
        this.hide();
    }
};

createBinding({
    name: "kendoNotification",
    watch: {
        error: function(value) {
            notificationHandler.call(this, ERROR, value);
        },
        info: function(value) {
            notificationHandler.call(this, INFO, value);
        },
        success: function(value) {
            notificationHandler.call(this, SUCCESS, value);
        },
        warning: function(value) {
            notificationHandler.call(this, WARNING, value);
        }
    }
});