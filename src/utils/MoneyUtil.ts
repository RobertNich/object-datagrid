export const formatCents = (amount: number): string => {
  const adjustedAmount = amount * 0.01;
  const textValue = `${Number(adjustedAmount)
    .toFixed(2)
    .replace(/\.?0+$/, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  return textValue;
};
