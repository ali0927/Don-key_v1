export const sendEvent = (obj: {
  eventCategory: string;
  eventAction: "click" | "load";
  eventLabel: string;
}) => {
  //@ts-ignore
  const ga = typeof window !== "undefined" ? window.gtag : null;
  if (ga) {
    ga("event", obj.eventCategory, obj);
  }
};
