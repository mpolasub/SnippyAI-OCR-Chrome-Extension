chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "captureScreenshot") {
        console.log("response about to send?");

            chrome.tabs.captureVisibleTab(function(screenshotDataUrl) {
                    sendResponse({imgSrc:screenshotDataUrl});
                    console.log("response sent");
                    console.log("screenshotDataUrl: " + screenshotDataUrl);

                }
            );
        return true;
    }
});


        //  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        //     const currentTab = tabs[0].id;

        //     chrome.runtime.onMessage.addListener(
        //         function(request, sender, sendResponse) {
        //        chrome.tabs.captureVisibleTab(
        //            null,
        //            {},
        //            function(dataUrl)
        //            {
                    
        //                sendResponse({imgSrc:dataUrl});
        //            }
        //        ); //remember that captureVisibleTab() is a statement
        //        return true;
        //        });
        //        chrome.scripting.executeScript( {
        //             target: {tabId: currentTab, allFrames: true},

        //            files: ["content.js"],
        //        }
        //     //    , function () { // Execute your code
        //     //        console.log("Script Executed .. "); // Notification on Completion
        //     //    }
        //        );
        //   });
