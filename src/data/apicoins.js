import { delay } from './utils';

export const fetchCoins = async () => {
  try {
    await delay(2000); // Délai de 2 secondes pour éviter les erreurs de quota
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching coins:', error);
    throw error;
  }
};
