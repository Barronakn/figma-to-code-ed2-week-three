export const fetchCoinDetails = async (coinId) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch coin details");
    }
    return await response.json();
  };
  