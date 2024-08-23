import { delay } from './utils';

export const fetchCategories = async () => {
  try {
    await delay(2000); // Délai de 2 secondes pour éviter les erreurs de quota
    const response = await fetch("https://api.coingecko.com/api/v3/coins/categories");
    if (!response.ok) throw new Error('Failed to fetch categories');
    const data = await response.json();
    return data.map(category => ({
      category_id: category.id,
      name: category.name
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
