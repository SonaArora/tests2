var RTCDesktopMediaManager = {

    initialize: function () {
        this.log("Script is initialized");
        this.sendResponseCallback = null;
    },

    onMessageExternal: function (message, sender, sendResponse) {
        var responseMsg = {};
        this.sendResponseCallback = sendResponse;

        var onAccessApproved = function (streamid) {
            if (streamid !== "") {
                this.log("Desktop Media sourceId: " + streamid);
                responseMsg.type = 'gotScreenSharing';
                responseMsg.sourceId = streamid;
                responseMsg.desktopMediaRequestId = pendingRequestId;
            } else {
                responseMsg.type = 'canceledGetScreen';
            }
            this.sendResponseCallback(responseMsg);
        }.bind(this);

        this.log("Inside external handler. Message is " + JSON.stringify(message));

        switch (message.type) {

            case "ping" :
                this.log("Received 'ping' msg in External Message handler");
                this.sendResponseCallback({ 'type' : 'pong' });
                break;

            case 'getScreen':
                var tab = sender.tab;
                tab.url = sender.url;

                var pendingRequestId = chrome.desktopCapture.chooseDesktopMedia(message.options || ['screen', 'window'], tab, onAccessApproved);
                return true;
                break;

            case 'cancelScreenSharing':
                chrome.desktopCapture.cancelChooseDesktopMedia(message.id);
                responseMsg.type = 'canceledGetScreen';
                this.sendResponseCallback(responseMsg);
                break;

            case 'focusTab':
                this.activateTab(sender.tab);
                break;

            default:
                this.log("Wrong message hash. Message is =" + message);
        }
        return false;
    },

    activateTab: function(tab) {
        try {
            chrome.tabs.update(tab.id, {
                active: true
            }, function() {
                chrome.windows.update(tab.windowId, {
                    focused: true
                }, function() {
                });
            });
        } catch(error) {
            this.log("Exception occured in 'activateTab': " + error);
        }
    },

    log: function(logMsg) {
        console.log("RTCDesktopMediaManager: " + logMsg);
    }

};

RTCDesktopMediaManager.initialize();