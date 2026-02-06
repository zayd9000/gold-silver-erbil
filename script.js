const goldApi = "https://api.metals.live/v1/spot/gold";
const silverApi = "https://api.metals.live/v1/spot/silver";
const exchangeApi = "https://api.exchangerate.host/latest?base=USD&symbols=IQD";

async function fetchPrices() {
  try {
    // Get gold & silver in USD
    const [goldRes, silverRes, exRes] = await Promise.all([
      fetch(goldApi),
      fetch(silverApi),
      fetch(exchangeApi)
    ]);

    const goldData = await goldRes.json();
    const silverData = await silverRes.json();
    const exData = await exRes.json();

    const goldUSD = goldData[0]; 
    const silverUSD = silverData[0]; 
    const usdToIqd = exData.rates.IQD;

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

// Load prices on page load
fetchPrices();

// Refresh every 5 minutes
setInterval(fetchPrices, 300000);
