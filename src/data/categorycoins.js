export const fetchCategories = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch coins");
    }
    return await response.json();
  };
  