import Web3 from "web3";

let web3: Web3 | null = null;
let isEnabling = false;
let done = false;

const waitUntilEnabled = () => {
    const promize = async (res: any, rej: any) => {
        await waitFor(1000);
        if (!isEnabling && done) {
            return res("");
        }
        if (isEnabling && !done) {
            promize(res, rej);
            // check again after few seconds
        }
    };

    return new Promise(promize);
};


export const waitFor = (time: number) => {
    return new Promise((res) => {
        setTimeout(res, time);
    });
};
export const getWeb3 = async () => {
   
    //@ts-ignore
    if (!window.ethereum) {
        window.alert("Please install MetaMask first.");
        return;
    }

    if (!web3) {
        try {
            // Request account access if needed

            if (isEnabling) {
                await waitUntilEnabled();
            }

            if (!isEnabling && !done) {
               
                isEnabling = true;
                //@ts-ignore

                await window.ethereum.enable();
            }

            // We don't know window.web3 version, so we use our own instance of Web3
            // with the injected provider given by MetaMask
            //@ts-ignore
            web3 = new Web3(window.ethereum);
        } catch (error) {
            window.alert("You need to allow MetaMask.");
            return;
        }
    }
    return web3;
};