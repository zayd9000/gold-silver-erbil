const apiURL = "https://raw.githubusercontent.com/zayd9000/gold-silver-erbil/main/prices.json"; // free JSON file

const exchangeApi = "https://api.exchangerate.host/latest?base=USD&symbols=IQD";

async function fetchPrices() {
  try {
    const [metalRes, exRes] = await Promise.all([
      fetch(apiURL),
      fetch(exchangeApi)
    ]);

    const metalData = await metalRes.json();
    const exData = await exRes.json();
    const usdToIqd = exData.rates.IQD;

    const goldUSD = metalData.gold;
    const silverUSD = metalData.silver;

    document.getElementById("gold-usd").textContent = goldUSD.toFixed(2);
    document.getElementById("gold-iqd").textContent = (goldUSD * usdToIqd).toFixed(0);

    document.getElementById("silver-usd").textContent = silverUSD.toFixed(2);
    document.getElementById("silver-iqd").textContent = (silverUSD * usdToIqd).toFixed(0);

  } catch (error) {
    console.error("Error fetching prices:", error);
    document.getElementById("gold-usd").textContent = "Error";
    document.getElementById("gold-iqd").textContent = "Error";
    document.getElementById("silver-usd").textContent = "Error";
    document.getElementById("silver-iqd").textContent = "Error";
  }
}

fetchPrices();
setInterval(fetchPrices, 300000);
