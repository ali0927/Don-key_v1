import { useWeb3React } from "@web3-react/core";
import { useMetaMaskLogin } from "hooks/useMetaMaskLogin";
import { useEffect } from "react";
import Routes from "./routes/Routes";
import "./scss/styles.scss";

function App() {
  const { doMetaMaskLogin } = useMetaMaskLogin();
  useEffect(() => {
    //@ts-ignore
    if (typeof window !== "undefined" && window.ethereum) {
      //@ts-ignore
      window.ethereum.on("accountsChanged", async function (accounts) {
        // Time to reload your interface with accounts[0]!
        await doMetaMaskLogin();
      });
    }
  }, []);

  return <Routes />;
}

export default App;
