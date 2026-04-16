function swapLang() {
    let from = document.getElementById("fromLang");
    let to = document.getElementById("toLang");

    let temp = from.value;
    from.value = to.value;
    to.value = temp;
}

async function translateText() {
    const apiKey = document.getElementById("apiKey").value;
    const region = document.getElementById("region").value;
    const text = document.getElementById("inputText").value;
    const targetLang = document.getElementById("toLang").value;

    if (!apiKey || !region || !text) {
        alert("Fill all fields!");
        return;
    }

    const endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${targetLang}`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": apiKey,
                "Ocp-Apim-Subscription-Region": region,
                "Content-Type": "application/json"
            },
            body: JSON.stringify([{ Text: text }])
        });

        const data = await response.json();

        document.getElementById("output").innerText =
            data[0].translations[0].text;

    } catch (error) {
        alert("Error occurred!");
    }
}