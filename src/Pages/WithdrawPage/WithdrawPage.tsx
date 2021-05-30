import { useWeb3 } from "don-components";
import React, { useEffect, useState } from "react";
import swampJSON from "JsonData/SwampFinance.json";
import BUSDJSon from "JsonData/BUSDToken.json";
import strategys from "JsonData/strategys.json";
import moment from "moment";

const swampFinanceAddress = "0x33AdBf5f1ec364a4ea3a5CA8f310B597B8aFDee3";
const swampTokenAddress = "0xc5A49b4CBe004b6FD55B30Ba1dE6AC360FF9765d";

const autoFarmAddress = "0x0895196562C7868C5Be92459FaE7f877ED450452";
const cakeLpAddress = "0x0eD7e52944161450477ee417DE9Cd3a859b14fD0";
const actualStrategyAddress = "0xd3484A7413C9D497734a59542BF7047A256c7192";
const strategyAddress = "0xF435527581e2dA72c2EB84C5Fb558e7FB48a629C";

const userAddress = "0x23BfE175bf12a23d0b62dC53476d728250A21387";
const beefyAddress = "0xfcA433b1c071737F92B76234984aBA10D04De57E";

const ShowInfo = ({
  title,
  refresh,
  getValue,
}: {
  title: string;
  getValue: () => Promise<string>;
  refresh: any;
}) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const web3 = useWeb3();
  useEffect(() => {
    (async () => {
      setLoading(true);
      const newVal = await getValue();
      setValue(web3.utils.fromWei(newVal));
      setLoading(false);
    })();
  }, [refresh]);

  return (
    <>
      <h4>{title}</h4>
      <p>Value: {loading ? "..." : value} </p>
    </>
  );
};

export const WithdrawPage = () => {
  const web3 = useWeb3();
  const createContract = (address: string, abi: any) => {
    return new web3.eth.Contract(abi, address);
  };
  const [refresh, setRefresh] = useState(false);
  const [refreshTime, setRefreshTime] = useState(moment());
  const doRefresh = () => {
    // setRefreshTime(moment())
    setRefresh((old) => !old);
  };
  const swampContract = createContract(swampFinanceAddress, swampJSON);
  const swampToken = createContract(swampTokenAddress, BUSDJSon);
  
  const beefyContract = createContract(beefyAddress, BUSDJSon);
  const autoFarmContract = createContract(autoFarmAddress, swampJSON);
  const cakeLP = createContract(cakeLpAddress, BUSDJSon);
  const strategyContract = createContract(strategyAddress, strategys.abi);

  const getSwampTokens = async (address: string) => {
    const amounts = await swampContract.methods
      .stakedWantTokens(119, address)
      .call();
    return amounts;
  };
  const getAutoFarmTokens = async (address: string) => {
    const amounts = await autoFarmContract.methods
      .stakedWantTokens(243, address)
      .call();
    return amounts;
  };
  const getAutoTokenBalance =  async (address: string) => {
    const tokens = await cakeLP.methods.balanceOf(address).call();
    return tokens;
  };
  const getBeefyToken = async (address: string) => {
    const beefyTokens = await beefyContract.methods.balanceOf(address).call();
    return beefyTokens;
  };

  const getSwampTokenBalance = async (address: string) => {
    const tokens = await swampToken.methods.balanceOf(address).call();
    return tokens;
  };

  const getaddress = (ct: any) => {
    return ct.options.address;
  };

  const unstakeSwamp = async () => {
    setTransferring("Unstaking Swamp Tokens");
    const accounts = await web3.eth.getAccounts();
    const amounts = await getSwampTokens(strategyAddress);
    const swampAbi = await swampContract.methods
      .withdraw(119, amounts)
      .encodeABI();
    await strategyContract.methods
      .directExecuteCubes([getaddress(swampContract)], [swampAbi])
      .send({ from: accounts[0] });
    doRefresh();
    setTransferring("SwampTokens Unstaked");
  };

  const unstakeCakeLp = async () => {
    setTransferring("Unstaking CakeLp Tokens");
    const accounts = await web3.eth.getAccounts();
    const amounts = await getAutoFarmTokens(strategyAddress);
    const autoAbi = await autoFarmContract.methods
      .withdraw(243, amounts)
      .encodeABI();
    await strategyContract.methods
      .directExecuteCubes([getaddress(autoFarmContract)], [autoAbi])
      .send({ from: accounts[0] });
    doRefresh();
    setTransferring("CakeLp Unstaked");
  };
  const transferCakeLp = async () => {
    setTransferring("Transferring Cake LP Tokens");

    const accounts = await web3.eth.getAccounts();
    const tokens = await getAutoTokenBalance(strategyAddress);
    const transferABI = await cakeLP.methods
      .transfer(userAddress, tokens)
      .encodeABI();
    await strategyContract.methods
      .directExecuteCubes([getaddress(cakeLP)], [transferABI])
      .send({ from: accounts[0] });
    doRefresh();
    setTransferring("Cake LP Transferred");
    // exectut
  };

  const transferSwamp = async () => {
    setTransferring("Transferring Swamp Tokens");

    const accounts = await web3.eth.getAccounts();
    const tokens = await getSwampTokenBalance(strategyAddress);
    const transferABI = await swampToken.methods
      .transfer(userAddress, tokens)
      .encodeABI();
    await strategyContract.methods
      .directExecuteCubes([getaddress(swampToken)], [transferABI])
      .send({ from: accounts[0] });
    doRefresh();
    setTransferring("SwampTokens Transferred");
    // exectut
  };

  const transferBeefy = async () => {
    setTransferring("Transferring Beefy");
    const beeyfTokens = await getBeefyToken(strategyAddress);
    const accounts = await web3.eth.getAccounts();
    const transferAbi = await beefyContract.methods.transfer(userAddress,beeyfTokens).encodeABI();
    await strategyContract.methods
    .directExecuteCubes([getaddress(beefyContract)], [transferAbi])
    .send({ from: accounts[0] });
    doRefresh();
    setTransferring("Beefy Done");
  }

  const logBalance = async () => {
    // const balance =;
    // console.log(web3.utils.fromWei(balance));
  };

  useEffect(() => {
    logBalance();
  }, []);
  const [transferring, setTransferring] = useState("");

  return (
    <div>
      <div className="container mt-5">
        <h4>Transfer Address: {userAddress}</h4>
        <h4>Strategy Address: {strategyAddress}</h4>
        {transferring && <h4 className="text-danger"> Msg: {transferring}</h4>}
        <div className="row mt-5">
          <div className="col-md-4">
            <ShowInfo
              title="Swamp Staked Tokens in Strategy"
              refresh={refresh}
              getValue={() => getSwampTokens(strategyAddress)}
            />
            <button onClick={unstakeSwamp}>Unstake Swamp</button>
            <ShowInfo
              title="Swamp Unstaked Tokens in Strategy"
              refresh={refresh}
              getValue={() => getSwampTokenBalance(strategyAddress)}
            />
            <button onClick={transferSwamp}>Transfer Swamp</button>
          </div>
          <div className="col-md-4">
            <ShowInfo
              title="Beefy Tokens in Strategy"
              refresh={refresh}
              getValue={() => getBeefyToken(strategyAddress)}
            />
            <button onClick={transferBeefy}>Transfer Beefy</button>
          </div>
          <div className="col-md-4">
            <ShowInfo
              title="Wbnb Cake Tokens Strategy"
              refresh={refresh}
              getValue={() => getAutoFarmTokens(strategyAddress)}
            />
            <button onClick={unstakeCakeLp}>Unstake Cake Lp</button>
            <ShowInfo
              title="Wbnb Cake Tokens Strategy"
              refresh={refresh}
              getValue={() => getAutoTokenBalance(strategyAddress)}
            />
            <button onClick={transferCakeLp}>Transfer Cake Lp</button>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4">
            <ShowInfo
              title="Swamp Tokens in User"
              refresh={refresh}
              getValue={() => getSwampTokenBalance(userAddress)}
            />
          </div>
          <div className="col-md-4">
            <ShowInfo
              title="Beefy Tokens in user"
              refresh={refresh}
              getValue={() => getBeefyToken(userAddress)}
            />
          </div>
          <div className="col-md-4">
            <ShowInfo
              title="Wbnb Cake Tokens user"
              refresh={refresh}
              getValue={() => getAutoTokenBalance(userAddress)}
            />
          </div>
        </div>
        <button onClick={doRefresh}>Refresh</button>
      </div>
    </div>
  );
};
