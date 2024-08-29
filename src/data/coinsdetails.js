import { delay } from './utils';

export const fetchCoinDetails = async (coinId) => {
  try {
    await delay(2000); // Délai de 2 secondes pour éviter les erreurs de quota
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch coin details");
    }
    return await response.json();
  } catch (error) {
    return {};
  }
};
