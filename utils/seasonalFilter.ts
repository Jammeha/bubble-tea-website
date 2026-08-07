import { Drink } from "@/app/data/drinks";

/**
 * Filters drinks based on their seasonal availability.
 * Drinks are active if:
 * 1. They are NOT seasonal.
 * 2. They ARE seasonal and the current date falls within availableFrom and availableTo.
 * 
 * @param drinks - The array of drink objects.
 * @returns The filtered array of active drinks.
 */
export const getActiveDrinks = (drinks: Drink[]): Drink[] => {
  const now = new Date();
  
  return drinks.filter(drink => {
    // If not seasonal, it's always active
    if (!drink.seasonal) return true;
    
    // If seasonal, check dates
    const from = drink.availableFrom ? new Date(drink.availableFrom) : null;
    const to = drink.availableTo ? new Date(drink.availableTo) : null;
    
    const isAfterStart = !from || now >= from;
    const isBeforeEnd = !to || now <= to;
    
    return isAfterStart && isBeforeEnd;
  });
};
