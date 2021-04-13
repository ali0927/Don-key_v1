import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { doLogin } from "./actions/authActions/authActions";
import { NotificationProvider } from "./components/Notification/NotificationProvider";
import { TooltipProvider } from "./components/TooltipProvider";
import Routes from "./routes/Routes";
import { getAuthTokenForPublicAddress } from "./services/api";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import "./scss/styles.scss";
import { AuthToken, getWeb3 } from "don-utils";
function getLibrary(provider: any) {
    return new Web3Provider(provider);
}
function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        //@ts-ignore
        if (typeof window !== "undefined" && window.ethereum) {
            //@ts-ignore
            window.ethereum.on("accountsChanged", async function (accounts: any) {
                // Time to reload your interface with accounts[0]!
                // detect wallet is UnLocked or not
                const web3 = await getWeb3();
                const coinbase = web3 ? await web3.eth.getCoinbase() : null;
                if (!coinbase) {
                    return;
                }
                
                const { token, user } = await getAuthTokenForPublicAddress(
                    accounts[0]
                );
                localStorage.setItem(AuthToken, token);
                dispatch(doLogin(user));
            });
        }
    }, [dispatch]);
    return (
        <div>
            <Web3ReactProvider getLibrary={getLibrary}>
                <NotificationProvider>
                    <TooltipProvider>
                        <Routes />
                    </TooltipProvider>
                </NotificationProvider>
            </Web3ReactProvider>
        </div>
    );
}

export default App;
