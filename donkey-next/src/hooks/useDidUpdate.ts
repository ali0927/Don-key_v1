import {  useRef } from "react"
import { useIsomorphicEffect } from "./useIsomorphicEffect";


export const useDidUpdate: typeof useIsomorphicEffect = (fn, deps) => {
    const hasMounted = useRef<boolean>(false);

    useIsomorphicEffect(() => {
        if(hasMounted.current){
            return fn()
        }else {
            hasMounted.current = true;
        }
    }, deps)
}