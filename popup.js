document.addEventListener("DOMContentLoaded", function () {
    
    document.getElementById("close-button").addEventListener("click", function () {
        window.close();
    });

    document.getElementById("snip-button").addEventListener("click", () => {
        chrome.runtime.sendMessage({name: "captureScreenshot"}, function(){
            console.log("got that screenshot ya know");
        });

        chrome.tabs.query({ active: true }, function (tabs) {
            let tab = tabs[0];
            chrome.scripting.executeScript({
                target: { tabId: tab.id, allFrames: true },
                files: ["content.js"],
            });
        });
    });
});



