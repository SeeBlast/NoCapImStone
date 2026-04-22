/** Convert a dollar amount (number or string) to integer cents. */
export const toCents = (dollars) => Math.round(Number(dollars) * 100);
 
/** Convert integer cents to a number of dollars (for display only). */
export const toDollars = (cents) => Number(cents) / 100;
 
/** Format integer cents as "$XX.XX". */
export const formatMoney = (cents) => '$' + (Number(cents) / 100).toFixed(2);
 