export const addDots = (value: string, limit: number): string => {
  const dots = "...";
  if (value.length > limit) {
    value = value.substring(0, limit) + dots;
  }

  return value;
};
