

export const convertToInternationalCurrencySystem = (labelValue: number | string) => {
  // Nine Zeroes for Billions

  return Number(labelValue).toLocaleString("en-us",{maximumFractionDigits:0});
};
