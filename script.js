
function calculatePrice() {

    const dr = Number(document.getElementById("dr").value);
    const traffic = Number(document.getElementById("traffic").value);

    const country = Number(document.getElementById("country").value);
    const niche = Number(document.getElementById("niche").value);
    const linkType = Number(document.getElementById("linkType").value);

    const priceElement = document.getElementById("price");
    const resultText = document.getElementById("resultText");

    if (dr < 0 || dr > 100 || isNaN(dr)) {

        priceElement.innerText = "$0";

        resultText.innerText =
            "Please enter a valid Domain Rating between 0 and 100.";

        return;
    }

    if (traffic < 0 || isNaN(traffic)) {

        priceElement.innerText = "$0";

        resultText.innerText =
            "Please enter a valid monthly traffic number.";

        return;
    }


    /*
        Basic estimated pricing formula.

        This is an initial calculator formula.
        It is NOT a guaranteed market price.
    */

    const authorityValue = dr * 2;

    const trafficValue =
        Math.log10(traffic + 1) * 18;

    let basePrice =
        15 +
        authorityValue +
        trafficValue;


    let estimatedPrice =
        basePrice *
        country *
        niche *
        linkType;


    estimatedPrice = Math.max(
        25,
        estimatedPrice
    );


    const lowerPrice =
        Math.round(estimatedPrice * 0.8);

    const upperPrice =
        Math.round(estimatedPrice * 1.2);


    priceElement.innerText =
        "$" +
        lowerPrice +
        " - $" +
        upperPrice;


    resultText.innerText =
        "Estimated price based on the information you provided. " +
        "Actual guest post prices can vary depending on the website, " +
        "publisher and market demand.";
}
