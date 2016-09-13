var CarmelLauncher = {

    initialize: function() {
        this.hostName = "com.bluejeans.meetings";
        this.port = null;
        this.response = null;

        this.log("Script is initialized");
        this.log("initialize: hostName " + this.hostName);
    },

    handleNativeDisconnect: function () {
        this.log("In handleNativeDisconnect : ", chrome.runtime.lastError.message);

        this.port = null;
        var msg = {
            message_type : "disconnect",
            message : chrome.runtime.lastError.message
        };
        this.response(msg);
    },

    handleNativeMessage: function (message) {
        this.log("In handleNativeMessage : ", message);
        this.response(message);
    },

    connect: function (obj) {
        this.log("Connecting to Native host...");

        this.port = chrome.runtime.connectNative(this.hostName);
        this.port.onMessage.addListener(function (message) {
            this.handleNativeMessage(message);
        }.bind(this), false);
        this.port.onDisconnect.addListener(function () {
            this.handleNativeDisconnect();
        }.bind(this), false);
        try {
            if (obj.message_type == "connect") {
                this.port.postMessage({ 'message_type' : 'launch', 'message' : obj.message });
            } else {
                this.port.postMessage({ 'message_type' : obj.message_type, 'message' : obj.message });
            }
        } catch (e) {
            var msg = {
                'message_type': 'error',
                'message': e.toString()
            };
            this.response(msg);
        }
    },

    onMessageExternal: function(message, sender, sendResponse) {
        this.response = sendResponse;

        switch(message.message_type) {

            case "ping" :
                this.log("Received 'ping' msg in External Message handler");
                this.response({ 'message_type' : 'ping', 'message' : 'pong' });
                break;

            case "check" :
                this.log("Received 'check' msg in External Message handler");
                this.connect(message);
                break;

            case "connect":
                this.log("Received 'connect' msg in External Message handler");
                this.connect(message);
                break;

            default:
                this.log("Unexpected 'message_type' passed: ", message.message_type);
        }

        return true;
    },

    log: function(logMsg) {
        console.log("CarmelLauncher: " + logMsg);
    }
};

CarmelLauncher.initialize();