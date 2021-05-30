import { useWeb3 } from "don-components";
import React, { useEffect, useState } from "react";
import swampJSON from "JsonData/SwampFinance.json";
import BUSDJSon from "JsonData/BUSDToken.json";
import strategys from "JsonData/strategys.json";
import moment from "moment";

const swampFinanceAddress = "0x33AdBf5f1ec364a4ea3a5CA8f310B597B8aFDee3";
const swampTokenAddress = "0xc5A49b4CBe004b6FD55B30Ba1dE6AC360FF9765d";
const mdexLpAddress = "0x0FB881c078434b1C0E4d0B64d8c64d12078b7Ce2";
const autoFarmAddress = "0x0895196562C7868C5Be92459FaE7f877ED450452";
const cakeLpAddress = "0x0eD7e52944161450477ee417DE9Cd3a859b14fD0";
const actualStrategyAddress = "0xd3484A7413C9D497734a59542BF7047A256c7192";
const strategyAddresss = "0xd3484A7413C9D497734a59542BF7047A256c7192";

const userAddresss = "0x23BfE175bf12a23d0b62dC53476d728250A21387";
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
    try {
      return new web3.eth.Contract(abi, address);
    } catch (e) {
      return new web3.eth.Contract(BUSDJSon as any, cakeLpAddress);
    }
  };
  const [refresh, setRefresh] = useState(false);

  const [swampAmount, setSwampAmount] = useState("");
  const [beefyAmount, setBeefyAmount] = useState("");
  const [autoAmount, setAutoAmount] = useState("");

  const [strategyAddress, setStrategyAddres] = useState(strategyAddresss);
  const [userAddress, setUserAddress] = useState(userAddresss);

  const doRefresh = () => {
    // setRefreshTime(moment())
    setRefresh((old) => !old);
  };
  const swampContract = createContract(swampFinanceAddress, swampJSON);
  const swampToken = createContract(swampTokenAddress, BUSDJSon);

  const beefyContract = createContract(beefyAddress, BUSDJSon);
  const autoFarmContract = createContract(autoFarmAddress, swampJSON);
  const cakeLP = createContract(cakeLpAddress, BUSDJSon);
  const mdexLp = createContract(mdexLpAddress, BUSDJSon);
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
  const getAutoTokenBalance = async (address: string) => {
    const tokens = await cakeLP.methods.balanceOf(address).call();
    return tokens;
  };
  const getBeefyToken = async (address: string) => {
    const beefyTokens = await beefyContract.methods.balanceOf(address).call();
    return beefyTokens;
  };

  const getSwampTokenBalance = async (address: string) => {
    const tokens = await mdexLp.methods.balanceOf(address).call();
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
      .withdraw(119, swampAmount || amounts)
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
      .withdraw(243, autoAmount || amounts)
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
    const transferABI = await mdexLp.methods
      .transfer(userAddress, tokens)
      .encodeABI();
    await strategyContract.methods
      .directExecuteCubes([getaddress(mdexLp)], [transferABI])
      .send({ from: accounts[0] });
    doRefresh();
    setTransferring("SwampTokens Transferred");
    // exectut
  };

  const transferBeefy = async () => {
    setTransferring("Transferring Beefy");
    const beeyfTokens = await getBeefyToken(strategyAddress);
    const accounts = await web3.eth.getAccounts();
    const transferAbi = await beefyContract.methods
      .transfer(userAddress, beefyAmount || beeyfTokens)
      .encodeABI();
    await strategyContract.methods
      .directExecuteCubes([getaddress(beefyContract)], [transferAbi])
      .send({ from: accounts[0] });
    doRefresh();
    setTransferring("Beefy Done");
  };

  const logBalance = async () => {
    // const balance =;
    // console.log(web3.utils.fromWei(balance));
  };

  useEffect(() => {
    logBalance();
  }, []);
  const [transferring, setTransferring] = useState("");

  return (
    <div className="py-5">
      <div className="container mt-5">
        <h4>Transfer Address: {userAddress}</h4>
        <h4>Strategy Address: {strategyAddress}</h4>
        <div className="mb-3">
          <label className="form-label">Strategy address</label>
          <input
            className="form-control"
            value={strategyAddress}
            onChange={(e) => setStrategyAddres(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">User address</label>
          <input
            className="form-control"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Swamp Token</label>
          <input
            className="form-control"
            value={swampAmount}
            onChange={(e) => setSwampAmount(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Auto Amount</label>
          <input
            className="form-control"
            value={autoAmount}
            onChange={(e) => setAutoAmount(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Beefy Amount</label>
          <input
            className="form-control"
            value={beefyAmount}
            onChange={(e) => setBeefyAmount(e.target.value)}
          />
        </div>

        {transferring && <h4 className="text-danger"> Msg: {transferring}</h4>}
        <div className="row mt-5">
          <div className="col-md-4">
            <ShowInfo
              title="Swamp Staked Tokens in Strategy"
              refresh={refresh}
              getValue={() => getSwampTokens(strategyAddress)}
            />
            <p>
              withdraw Amount:{" "}
              {swampAmount ? web3.utils.fromWei(swampAmount) : "Full Amount"}
            </p>
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
            <p>
              withdraw Amount:{" "}
              {beefyAmount ? web3.utils.fromWei(beefyAmount) : "Full Amount"}
            </p>
            <button onClick={transferBeefy}>Transfer Beefy</button>
          </div>
          <div className="col-md-4">
            <ShowInfo
              title="Wbnb Cake Tokens Strategy"
              refresh={refresh}
              getValue={() => getAutoFarmTokens(strategyAddress)}
            />
            <p>
              Unstaked Cake Amount:{" "}
              {cakeLP ? web3.utils.fromWei(autoAmount) : "Full Amount"}
            </p>
            <button onClick={unstakeCakeLp}>Unstake Cake Lp</button>
            <ShowInfo
              title="Wbnb Cake Unstaked Tokens Strategy"
              refresh={refresh}
              getValue={() => getAutoTokenBalance(strategyAddress)}
            />
            <button onClick={transferCakeLp}>Transfer Cake Lp</button>
          </div>
        </div>
        <div className="row mt-5 mb-5">
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
