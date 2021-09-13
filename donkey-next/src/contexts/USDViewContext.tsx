import { createContext, useContext } from "react";

const initialValue = { isUSD: false, toggle: () => {} };
const USDViewContext = createContext(initialValue);

export const useUSDViewBool = () => useContext(USDViewContext);

export const USDViewProvider: React.FC<{
  children: React.ReactNode;
  value: typeof initialValue;
}> = ({ children, value }) => {
  return (
    <USDViewContext.Provider value={value}>{children}</USDViewContext.Provider>
  );
};
