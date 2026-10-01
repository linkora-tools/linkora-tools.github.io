/* =========================================================
   LINKORA SEO TOOLS
   ========================================================= */


/* ================= GUEST POST CALCULATOR ================= */

function calculateGuestPost() {

    const dr = Number(
        document.getElementById("gp-dr").value
    );

    const traffic = Number(
        document.getElementById("gp-traffic").value
    );

    const country = Number(
        document.getElementById("gp-country").value
    );

    const niche = Number(
        document.getElementById("gp-niche").value
    );

    const linkType = Number(
        document.getElementById("gp-link").value
    );

    const priceElement =
        document.getElementById("gp-price");

    const resultText =
        document.getElementById("gp-result");


    if (
        isNaN(dr) ||
        dr < 0 ||
        dr > 100
    ) {

        priceElement.innerText = "$0";

        resultText.innerText =
            "Please enter a valid Domain Rating between 0 and 100.";

        return;
    }


    if (
        isNaN(traffic) ||
        traffic < 0
    ) {

        priceElement.innerText = "$0";

        resultText.innerText =
            "Please enter a valid monthly traffic number.";

        return;
    }


    const authorityValue =
        dr * 2;

    const trafficValue =
        Math.log10(traffic + 1) * 18;

    const basePrice =
        15 +
        authorityValue +
        trafficValue;

    const estimatedPrice =
        basePrice *
        country *
        niche *
        linkType;

    const finalPrice =
        Math.max(
            25,
            estimatedPrice
        );

    const lowerPrice =
        Math.round(
            finalPrice * 0.8
        );

    const upperPrice =
        Math.round(
            finalPrice * 1.2
        );


    priceElement.innerText =
        "$" +
        lowerPrice +
        " - $" +
        upperPrice;


    resultText.innerText =
        "Estimated guest post price based on the information you provided. Actual prices may vary by publisher and market.";
}


/* ================= BACKLINK CALCULATOR ================= */

function calculateBacklink() {

    const dr = Number(
        document.getElementById("bl-dr").value
    );

    const traffic = Number(
        document.getElementById("bl-traffic").value
    );

    const country = Number(
        document.getElementById("bl-country").value
    );

    const niche = Number(
        document.getElementById("bl-niche").value
    );

    const linkType = Number(
        document.getElementById("bl-link").value
    );

    const placement = Number(
        document.getElementById("bl-placement").value
    );


    const priceElement =
        document.getElementById("bl-price");

    const resultText =
        document.getElementById("bl-result");


    if (
        isNaN(dr) ||
        dr < 0 ||
        dr > 100
    ) {

        priceElement.innerText = "$0";

        resultText.innerText =
            "Please enter a valid Domain Rating between 0 and 100.";

        return;
    }


    if (
        isNaN(traffic) ||
        traffic < 0
    ) {

        priceElement.innerText = "$0";

        resultText.innerText =
            "Please enter a valid monthly traffic number.";

        return;
    }


    const authorityValue =
        dr * 2.5;

    const trafficValue =
        Math.log10(traffic + 1) * 20;

    const basePrice =
        20 +
        authorityValue +
        trafficValue;

    const estimatedPrice =
        basePrice *
        country *
        niche *
        linkType *
        placement;

    const finalPrice =
        Math.max(
            25,
            estimatedPrice
        );

    const lowerPrice =
        Math.round(
            finalPrice * 0.8
        );

    const upperPrice =
        Math.round(
            finalPrice * 1.2
        );


    priceElement.innerText =
        "$" +
        lowerPrice +
        " - $" +
        upperPrice;


    resultText.innerText =
        "Estimated backlink value based on the information you provided. Actual prices may vary by publisher and market.";
}


/* ================= ARTICLE INDEXER ================= */

async function submitArticleForIndexing() {
    const urlInput = document.getElementById("article-url");
    const statusElement = document.getElementById("article-status");
    const resultElement = document.getElementById("article-result");

    const articleUrl = urlInput.value.trim();

    if (!articleUrl) {
        statusElement.innerText = "Error";
        resultElement.innerText = "Please enter an article URL.";
        return;
    }

    try {
        new URL(articleUrl);
    } catch {
        statusElement.innerText = "Invalid URL";
        resultElement.innerText =
            "Please enter a valid URL, for example: https://example.com/article";
        return;
    }

    statusElement.innerText = "Checking...";
    resultElement.innerText =
        "Connecting to Linkora indexing system...";

    try {
        const response = await fetch(
            "https://soft-mouse-39bf.faizanyaseen74191.workers.dev/api/index",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url: articleUrl
                })
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            statusElement.innerText = "Check Failed";
            resultElement.innerText =
                data.message || "Unable to process this article.";
            return;
        }

        statusElement.innerText = "Checked ✓";

        let message = data.message || "Article checked successfully.";

        if (data.title) {
            message += "\n\nTitle: " + data.title;
        }

        if (data.noindex) {
            message +=
                "\n\n⚠️ This article has a noindex directive.";
        } else {
            message +=
                "\n\n✓ No noindex directive detected.";
        }

        if (data.canonical) {
            message +=
                "\nCanonical: " + data.canonical;
        }

        resultElement.innerText = message;

    } catch (error) {
        console.error(error);

        statusElement.innerText = "Connection Error";
        resultElement.innerText =
            "Unable to connect to the Linkora backend. Please try again.";
    }
} {

    const urlInput =
        document.getElementById("article-url");

    const statusElement =
        document.getElementById("article-status");

    const resultElement =
        document.getElementById("article-result");


    /* Make sure the Article Indexer elements exist */

    if (
        !urlInput ||
        !statusElement ||
        !resultElement
    ) {

        console.error(
            "Article Indexer elements were not found."
        );

        return;
    }


    const articleUrl =
        urlInput.value.trim();


    /* Empty URL */

    if (!articleUrl) {

        statusElement.innerText =
            "Error";

        resultElement.innerText =
            "Please enter an article URL.";

        return;
    }


    /* Validate URL */

    let url;

    try {

        url =
            new URL(articleUrl);

    } catch (error) {

        statusElement.innerText =
            "Invalid URL";

        resultElement.innerText =
            "Please enter a valid article URL, for example: https://example.com/article";

        return;
    }


    /* Only HTTP / HTTPS URLs */

    if (
        url.protocol !== "http:" &&
        url.protocol !== "https:"
    ) {

        statusElement.innerText =
            "Invalid URL";

        resultElement.innerText =
            "Please use a URL starting with https:// or http://";

        return;
    }


    /* Show processing state */

    statusElement.innerText =
        "Checking...";

    resultElement.innerText =
        "Checking the article URL. Please wait...";


    /* Disable button while checking */

    const button =
        document.querySelector(
            '#article-indexer button[onclick="submitArticleForIndexing()"]'
        );


    if (button) {

        button.disabled = true;

        button.innerText =
            "Checking...";

    }


    /* Temporary frontend processing */

    setTimeout(function () {

        statusElement.innerText =
            "URL Received";

        resultElement.innerText =
            "Your article URL has been received successfully. The indexing process is ready for backend connection.";

        if (button) {

            button.disabled = false;

            button.innerText =
                "Submit Article →";

        }

    }, 1500);

}


/* ================= PAGE READY CHECK ================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Linkora script loaded successfully."
        );

    }
);
