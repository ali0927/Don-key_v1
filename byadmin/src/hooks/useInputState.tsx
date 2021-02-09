import React, { useState } from "react";
import { useCallback } from "react";
import { tuplify } from "../helpers/tuplify";

export const useInputState = (val?: string) => {
  const [state, setState] = useState(val);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if(typeof e !== "object"){
      setState(e);
    }else {
      setState(e.target.value);
    }
    
  }, []);

  return tuplify(state, onChange);
};
