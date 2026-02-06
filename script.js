const goldApi = "https://data-asg.goldprice.org/dbXRates/USD"; // gold & silver in USD
const exchangeApi = "https://api.exchangerate.host/latest?base=USD&symbols=IQD"; // USD to IQD

async function fetchPrices() {
  try {
   
    const goldRes = await fetch(goldApi);
    const goldData = await goldRes.json();
    const goldUSD = goldData.items[0].xauPrice; // gold USD/oz
    const silverUSD = goldData.items[0].xagPrice; // silver USD/oz

    
    const exRes = await fetch(exchangeApi);
    const exData = await exRes.json();
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


fetchPrices();


setInterval(fetchPrices, 300000);
