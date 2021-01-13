import { useCallback, useRef } from "react";

export const useSetRef = (val) => {
  const ref = useRef(val);
  const setRef = useCallback((newval) => {
    if (typeof newval === "function") {
      newval = newval(ref.current);
    }
    console.log(newval);
    ref.current = newval;
  }, []);
  const getVal = useCallback(() => {
    return ref.current;
  }, []);
  return [getVal, setRef];
};
