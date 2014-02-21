
console.log("Extension loading");
var storage = chrome.storage.local;

function setExtensionBadgeState(booleanState){
    if (booleanState){
        storage.set({"extensionActivityState" : {"state" : true}});
        chrome.browserAction.setBadgeText({text: "on"});

        console.log("Running script " + '[' + new Date().toUTCString() + ']');
        chrome.tabs.executeScript(null, {file: "js/content_script.js"});
    } else {
        storage.set({"extensionActivityState" : {"state" : false}});
        chrome.browserAction.setBadgeText({text: "off"});
    }
}

function initExtensionActivityState(){
    chrome.storage.local.get("extensionActivityState",
        function(result){
            if (result.extensionActivityState){
                console.log("Extension activity state is already initialized");
                setExtensionBadgeState(result.extensionActivityState.state);
            } else {
                console.log("Initializing the extension state to 'true' for the first time");
                setExtensionBadgeState(true);
            }
        }
    );
}

// execute the content_script on the current tab (null tabId means the script will run at the current tab)
function runScript(){
    storage.get("extensionActivityState",
        function(result){
            if (result.extensionActivityState){
                var isExtensionOn = result.extensionActivityState.state;
                if (isExtensionOn) {
                    console.log("Running substitution script " + '[' + new Date().toUTCString() + ']');
                    chrome.tabs.executeScript(null, {file: "js/content_script.js"});
                }
            } else{
                console.error("extensionActivityState is not initialized");
            }
        }
    );
}

chrome.browserAction.onClicked.addListener(function(tab) {
    storage.get("extensionActivityState",
        function(result){
            if (result.extensionActivityState){
                var isExtensionOn = result.extensionActivityState.state;
                setExtensionBadgeState(!isExtensionOn);
            } else {
                console.error("extensionActivityState is not initialized");
            }
        }
    );
});

initExtensionActivityState();



	