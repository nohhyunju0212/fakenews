document.getElementById("check").addEventListener("click", function () {
    const resultBox = document.getElementById("result");

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "getArticle" }, function (response) {
            if (chrome.runtime.lastError) {
                resultBox.innerText = "오류: " + chrome.runtime.lastError.message;
                return;
            }

            if (!response) {
                resultBox.innerText = "응답이 없어요.";
                return;
            }

            const title = response.title;
            const body = response.body;

            const speculationWords = [
                "가능성",
                "추정",
                "전망",
                "관계자에 따르면",
                "알려졌다",
                "전해졌다",
                "보인다",
                "예상된다"
            ];

            let foundWords = [];

            for (let i = 0; i < speculationWords.length; i++) {
                if (body.includes(speculationWords[i])) {
                    foundWords.push(speculationWords[i]);
                }
            }

            resultBox.innerText =
                "제목: " + title + "\n\n" +
                "추정성 표현 개수: " + foundWords.length + "\n\n" +
                "발견된 표현:\n" + foundWords.join("\n");
        });
    });
});