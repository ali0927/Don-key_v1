export const shortLargeAddress = (
  value: string,
  max: number,
  addDots?: string,
): string => {
  addDots = addDots || "..."
  return ( value.length > max ? value.substring(0,max)+addDots+value.slice(-4) : value);
};
