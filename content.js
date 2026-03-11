chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getArticle") {
        const title = document.title;
        const bodyText = document.body.innerText;

        sendResponse({
            title: title,
            body: bodyText
        });
    }
});