import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { doLogin } from "./actions/authActions/authActions";
import { NotificationProvider } from "./components/Notification/NotificationProvider";
import { TooltipProvider } from "./components/TooltipProvider";
import { AuthToken } from "./constants";
import Routes from "./routes/Routes";
import { getAuthTokenForPublicAddress } from "./services/api";
// import { Web3ReactProvider } from "@web3-react/core";
// // import your favorite web3 convenience library here

// function getLibrary(provider, connector) {
//   return new Web3Provider(provider); // this will vary according to whether you use e.g. ethers or web3.js
// }
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", async function (accounts) {
        // Time to reload your interface with accounts[0]!
        console.log(accounts[0]);
        const { token, user } = await getAuthTokenForPublicAddress(accounts[0]);
        localStorage.setItem(AuthToken, token);
        dispatch(doLogin(user));
      });
    }
  }, [dispatch]);
  return (
    <div>
      <NotificationProvider>
        <TooltipProvider>
         
            <Routes />
          
        </TooltipProvider>
      </NotificationProvider>
    </div>
  );
}

export default App;
