export const fetchDaysCoinData = async (coinId) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=365`
      );
      const result = await response.json();
  
      const monthlyData = [];
      const currentYear = new Date().getFullYear();
  
      result.prices.forEach((priceData) => {
        const date = new Date(priceData[0]);
        if (date.getFullYear() === currentYear) {
          const month = date.toLocaleString("default", { month: "short" });
          const price = priceData[1];
          monthlyData.push({ name: month, price });
        }
      });
  
      return monthlyData;
    } catch (error) {
      console.error("Erreur lors de la récupération des données du coin:", error);
      throw error;
    }
  };
  