import React, { useEffect, useState } from "react";
import { getAuthToken, getNonce } from "../services/api";
import { useHistory } from "react-router-dom";
import { useNotification } from "../components/Notification";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { convertUtf8ToHex } from "@walletconnect/utils";
import { AuthToken } from "../constants";

export const useWalletConnectHook = () => {
  const [state, setState] = useState({
    accounts: [],
    chainId: null,
    connector: null,
  });
  const history = useHistory();
  const { showNotification } = useNotification();
  const onConnect = (args, connector) => {
    setState({ ...args, connector });
  };
  const handleWalletConnect = async () => {
    // Create a connector
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    });
    await connector.killSession();
    if (!connector.connected) {
      // create new session
      await connector.createSession();
      connector.on("connect", (error, payload) => {
        if (error) {
          throw error;
        }
        connector.signPersonalMessage();
        // Get provided accounts and chainId
        onConnect(payload.params[0], connector);
      });

      connector.on("session_update", (error, payload) => {
        if (error) {
          throw error;
        }
        onConnect(payload.params[0], connector);
        // Get updated accounts and chainId
      });

      connector.on("disconnect", (error, payload) => {
        if (error) {
          throw error;
        }
        setState({ accounts: [], chainId: null });

        // Delete connector
      });
    } else {
      setState({
        accounts: connector.accounts,
        chainId: connector.chainId,
        connector,
      });
    }
  };

  const handleAuth = async (publicAddress) => {
    const nonce = await getNonce(publicAddress);
    const msgParams = [convertUtf8ToHex(nonce), publicAddress];
    const { connector } = state;
    console.log(connector);
    const signature = await connector.signPersonalMessage(msgParams);

    const { user, token } = await getAuthToken(publicAddress, signature);
    localStorage.setItem(AuthToken, token);
    localStorage.setItem("user", JSON.stringify(user));
    history.push("/myaccount");
    showNotification({
      msg: (
        <>
          <p className="text-center">WalletConnect Account Connected</p>
          <p className="text-center">{publicAddress}</p>
        </>
      ),
    });
  };

  useEffect(() => {
    const publicAddress = state.accounts[0];
    if (publicAddress) {
      handleAuth(publicAddress);
    }
  }, [state]);
  return { handleWalletConnect };
};
