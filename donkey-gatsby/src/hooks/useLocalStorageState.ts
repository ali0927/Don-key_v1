import { useIsomorphicEffect } from "hooks";
import { useState } from "react";

export const useLocalStorageState = <T extends any>(
    key: string,
    initiVal?: T,
    caching = true
  ) => {
    const [state, setState] = useState(initiVal);
    const [isReady, setIsReady] = useState(false);
  
    const updateState = (funOrVal: ((val: T) => T) | T) => {
      if (typeof funOrVal === "function") {
        setState((old) => {
          //@ts-ignore
          const updatedState = funOrVal(old as T);
          localStorage.setItem(
            key,
            JSON.stringify({ state: updatedState, timestamp: Date.now() })
          );
          return updatedState;
        });
      } else {
        localStorage.setItem(
          key,
          JSON.stringify({ state: funOrVal, timestamp: Date.now() })
        );
        setState(funOrVal);
      }
    };
    useIsomorphicEffect(() => {
      if (caching) {
        const oldLocalState = localStorage.getItem(key);
        if (oldLocalState) {
          const result = JSON.parse(oldLocalState);
          if (result.timestamp + 10 * 60 * 1000 > Date.now()) {
            setState(result.state);
          } else {
            localStorage.removeItem(key);
          }
        }
        setIsReady(true);
      } else {
        setIsReady(true);
      }
    }, [caching]);
    return {
      state: state as T,
      updateState,
      hasLoaded: isReady,
    };
  };