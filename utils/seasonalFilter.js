/**
 * Filters drinks based on their seasonal availability.
 * Drinks are active if:
 * 1. They are NOT seasonal.
 * 2. They ARE seasonal and the current date falls within availableFrom and availableTo.
 * 
 * @param {Array} drinks - The array of drink objects.
 * @returns {Array} - The filtered array of active drinks.
 */
export const getActiveDrinks = (drinks) => {
  const now = new Date();
  
  return drinks.filter(drink => {
    // If not seasonal, it's always active
    if (!drink.seasonal) return true;
    
    // If seasonal, check dates
    const from = drink.availableFrom ? new Date(drink.availableFrom) : null;
    const to = drink.availableTo ? new Date(drink.availableTo) : null;
    
    // If both dates are missing, treat as active (or inactive depending on preference)
    // Here we'll treat as active if at least one isn't specified, or both are null.
    // If dates are specified, they must be valid relative to "now".
    
    const isAfterStart = !from || now >= from;
    const isBeforeEnd = !to || now <= to;
    
    return isAfterStart && isBeforeEnd;
  });
};
