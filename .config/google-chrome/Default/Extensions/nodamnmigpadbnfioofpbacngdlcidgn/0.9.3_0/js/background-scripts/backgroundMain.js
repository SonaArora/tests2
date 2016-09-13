var BackgroundMain = {

    initialize: function () {
        this.log("Script is initialized");
        var self = this;

        chrome.runtime.onMessageExternal.addListener(function (message, sender, sendResponse) {

            switch(message.targetModule) {

                case "CarmelLauncher":
                    CarmelLauncher.onMessageExternal(message, sender, sendResponse);
                    break;
                case "RTCDesktopMedia":
                    RTCDesktopMediaManager.onMessageExternal(message, sender, sendResponse);
                    break;
                default:
                    console.error('BackgroundMain: Invalid "targetModule" passed in message: ', message.targetModule);
            }

            return true;
        });
    },

    log: function(logMsg) {
        console.log("BackgroundMain: " + logMsg);
    }

};

BackgroundMain.initialize();
