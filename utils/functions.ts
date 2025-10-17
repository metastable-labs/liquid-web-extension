export const formatCurrency = (n: number, frac = 2) =>
  `$${n.toLocaleString(undefined, {
    minimumFractionDigits: frac,
    maximumFractionDigits: frac,
  })}`;

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

// Simple number formatter without currency symbol. Use when you want a
// readable number (e.g. balances) and will append the token symbol yourself.
export const formatNumber = (n: number, frac = 0) =>
  n.toLocaleString(undefined, {
    minimumFractionDigits: frac,
    maximumFractionDigits: frac,
  });
