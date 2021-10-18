export const sendEvent = (
  eventName: string,
  data: {
    [x: string]: string;
  }
) => {
  //@ts-ignore
  const ga = typeof window !== "undefined" ? window.gtag : null;
  if (ga) {
    ga("event", eventName, data);
  }
};
