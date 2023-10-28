document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("close-button").addEventListener("click", function () {
        window.close();
    });

    document.getElementById("snip-button").addEventListener("click", () => {

        // do query to add tab to sender parameter
        chrome.runtime.sendMessage({ action: "captureScreenshot", tab }, (response) => {
          console.log("Screenshot captured:", response.imgSrc);
        });

    });


    // document.getElementById("snip-button").addEventListener("click", function () {

    //     //TODO: link to snipping tool

        
        
    // });
});



