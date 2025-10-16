export const formatCurrency = (n: number, frac = 2) =>
  `$${n.toLocaleString(undefined, {
    minimumFractionDigits: frac,
    maximumFractionDigits: frac,
  })}`;

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));
