import { AuthToken } from "don-utils";
import { useEffect } from "react";

export const AccountChangeListener = () => {
  useEffect(() => {
    //@ts-ignore

    if (typeof window !== "undefined" && window.ethereum) {
      const handleLogin = async (accounts: any) => {
        // Time to reload your interface with accounts[0]!
        localStorage.removeItem("tokenLogo");
        localStorage.removeItem(AuthToken);
        window.location.reload();
      };
      // @ts-ignore
      window.ethereum.on("accountsChanged", handleLogin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
