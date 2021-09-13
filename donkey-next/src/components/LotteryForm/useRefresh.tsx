import React, { createContext, useContext, useState } from "react";

const RefreshContext = createContext({ dependsOn: 0, refresh: () => {} });

export const useRefresh = () => useContext(RefreshContext);

export const RefreshProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState(0);

  const refresh = () => setState((old) => old + 1);

  return (
    <RefreshContext.Provider value={{ dependsOn: state, refresh }}>
      {children}
    </RefreshContext.Provider>
  );
};
