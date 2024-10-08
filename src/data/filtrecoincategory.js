export const filtreCoinCategory = async (categoryId) => {
  if (!categoryId) {
    throw new Error('Category ID is required');
  }

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&category=${categoryId}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 429) {
        console.warn(`Rate limit hit. Retrying after delay...`);
        await delay(3000);  
        return await filtreCoinCategory(categoryId); 
      }
      throw new Error(`Error fetching coins for category ${categoryId}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    return []; 
  }
};
