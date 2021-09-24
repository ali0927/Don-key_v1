
import { useWeb3Context } from "don-components";
import { captureException } from "helpers";
import { useEffect } from "react";

export const useAddDonTokenonLoad = () => {
    const { chainId: network } = useWeb3Context();
    useEffect(() => {
        // Add DON token with icon on Metamask
        const tokenSymbol = "DON";
        const tokenDecimals = 18;
        const tokenImage =
          "https://don-key.fra1.digitaloceanspaces.com/farmer-icons/logo-gold.png";
        let tokenAdded = localStorage.getItem("tokenLogo");
        if (network === 56 && !tokenAdded) {
          // Binance Smart Chain
          const tokenAddress = "0x86b3f23b6e90f5bbfac59b5b2661134ef8ffd255";
          window.ethereum
            .request({
              method: "wallet_watchAsset",
              params: {
                type: "ERC20",
                options: {
                  address: tokenAddress,
                  symbol: tokenSymbol,
                  decimals: tokenDecimals,
                  image: tokenImage,
                },
              },
            })
            .then((success: any) => {
              if (success) {
                localStorage.setItem("tokenLogo", "added");
              } else {
                throw new Error("Something went wrong.");
              }
            })
            .catch((err: any) => {
              captureException(err, "useAddToken on Load")
            });
        } else if (network === 1 && !tokenAdded) {
          // Ethereum Mainnet
          const tokenAddress = "0x217ddead61a42369a266f1fb754eb5d3ebadc88a";
          window.ethereum
            .request({
              method: "wallet_watchAsset",
              params: {
                type: "ERC20",
                options: {
                  address: tokenAddress,
                  symbol: tokenSymbol,
                  decimals: tokenDecimals,
                  image: tokenImage,
                },
              },
            })
            .then((success: any) => {
              if (success) {
                localStorage.setItem("tokenLogo", "added");
              } else {
                throw new Error("Something went wrong.");
              }
            })
            .catch((err: any) => {
              captureException(err, "Eth Token Add Failed");
            });
        }
      }, [network]);
}