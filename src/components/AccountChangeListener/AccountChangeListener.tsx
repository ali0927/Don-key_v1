import { useMetaMaskLogin } from "hooks/useMetaMaskLogin";
import { useEffect } from "react";



export const AccountChangeListener = () => {
  const {doMetaMaskLogin} = useMetaMaskLogin()
  useEffect(() => {
    //@ts-ignore
    
    if (typeof window !== "undefined" && window.ethereum) {
      const handleLogin = async (accounts: any) => {
        // Time to reload your interface with accounts[0]!
        await doMetaMaskLogin();
      }
      //@ts-ignore
      window.ethereum.on("accountsChanged",handleLogin);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return null;

}