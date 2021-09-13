import { useEffect } from "react";

export const useEffectOnTabFocus: typeof useEffect = (fn, deps) => {
    useEffect(() => {
      let hidden: string = "hidden",
        visibilityChange: string = "visibilitychange";
      //@ts-ignore
      if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
        //@ts-ignore
      } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
      }
  
      const handleVisibilityChange = () => {
        const isHidden = document[hidden as "hidden"];
        if(!isHidden){
          fn()
        }
      };
  
      document.addEventListener(
        visibilityChange as "visibilityChange",
        handleVisibilityChange,
        false
      );
      handleVisibilityChange();
      return () => {
        document.removeEventListener(
          visibilityChange as "visibilityChange",
          handleVisibilityChange
        );
      };
    }, deps);
  };