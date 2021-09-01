import { useState, useEffect } from "react";
import { InvestmentPopup } from "components/InvestmentPopup/InvestmentPopup";
import { shortenAddress } from "don-utils";
import { useMediaQuery } from "@material-ui/core";
import { TotalProfitLoss } from "components/TotalProfitLoss";
import { useIsInvested } from "hooks/useIsInvested";
import { WithDrawPopup } from "components/WithDrawPopup";
import {
  calculateWithdrawAmount,
  getPoolContract,
  getPoolToken,
  toEther,
} from "helpers";
import { useWeb3 } from "don-components";
import { ButtonWidget } from "components/Button";
import { useROIAndInitialInvestment } from "hooks/useROIAndInitialInvestment";
import BigNumber from "bignumber.js";
import { useUSDViewBool } from "contexts/USDViewContext";
import { DollarView } from "./DollarView";
import { useRefresh } from "components/LotteryForm/useRefresh";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import clsx from "clsx";
import { AssignLpTokens } from "./AssignLpTokens";
import { UpdatePoolDialog } from "./UpdatePoolDialog";
import { SendWithdrawalsDialog } from "./SendWithdrawals";
import {
  Columns,
  ColumnsTitle1,
  ColumnsSubTitle,
  CardLabel,
  CardValue,
  CardWrapper,
  CardInnerInfo,
  formatNum,
} from "./DetailTable";
import { CardDollar, InvestmentIcon, LPShareIcon, ProfitIcon } from "icons";
import { INetwork } from "interfaces";
import { BoostButton } from "../TokenPage/BoostButton";
import styled from "styled-components";

const DollarCardRoot = styled.div`
position: absolute;
right: -15%;
top: -17%;
border-radius: 100%;
background: #FFF037;
`;


export const InvestBlackCard = ({
  poolAddress,
  poolVersion,
  network,
}: {
  poolAddress: string;
  poolVersion: number;
  network: INetwork;
}) => {
  const { refresh, dependsOn } = useRefresh();
  const isSmall = useMediaQuery(`@media screen and (max-width:400px)`);
  const finalPoolAddress = isSmall ? shortenAddress(poolAddress) : poolAddress;
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);
  const { getIsInvested, isInvested } = useIsInvested(poolAddress);
  const [currentHoldings, setCurrentHoldings] = useState("0");
  const web3 = useWeb3();
  const [showInvestmentPopup, setShowInvestmentPopup] = useState(false);

  const { isUSD } = useUSDViewBool();
  const [isFarmer, setIsFarmer] = useState(false);
  const [tokenInPool, setTokeninPool] = useState("0");
  const [isUpdatePoolOpen, setIsUpdateOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isSendWithdrawOpen, setIsSendWithdraw] = useState(false);

  const checkIsFarmer = async () => {
    if (poolVersion === 3 || poolVersion === 4) {
      const poolContract = await getPoolContract(
        web3,
        poolAddress,
        poolVersion
      );
      const farmerAddress = await poolContract.methods
        .getFarmerAddress()
        .call();
      const accounts = await web3.eth.getAccounts();
      if (farmerAddress === accounts[0]) {
        setIsFarmer(true);
      }
      const poolToken = await getPoolToken(web3, poolAddress);
      const poolTokenAmount = await poolToken.methods
        .balanceOf(poolAddress)
        .call();
      setTokeninPool(toEther(poolTokenAmount));
    }
  };

  const [withdrawLp, setWithdrawLp] = useState(new BigNumber("0"));

  const [totalLp, setTotalLp] = useState(new BigNumber("0"));

  const fetchWithdrawShare = async () => {
    if (poolVersion === 3 || poolVersion === 4) {
      const poolContract = await getPoolContract(
        web3,
        poolAddress,
        poolVersion
      );
      const lpTokens = await poolContract.methods.totalSupply().call();
      const withdrawLp = await poolContract.methods
        .getTotalGreyWithdrawalAmount()
        .call();
      setTotalLp(new BigNumber(toEther(lpTokens)));
      setWithdrawLp(new BigNumber(toEther(withdrawLp.LPAmount)));
    }
  };

  useEffect(() => {
    async function apiCall() {
      let withdrawAmount = await calculateWithdrawAmount(web3, poolAddress);

      setCurrentHoldings(withdrawAmount);
      getIsInvested();
      fetchRoi();
    }
    apiCall();
    checkIsFarmer();
    fetchWithdrawShare();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependsOn]);

  const onSuccess = () => {
    setShowWithdrawPopup(false);
    refresh();
  };

  const { initialInvestment, myShare, fetchRoi, initialInvestmentInUSD } =
    useROIAndInitialInvestment(
      web3,
      finalPoolAddress,
      dependsOn % 2 == 0,
      true
    );
  const getSecondCardColumns = (
    label: string,
    value: string | React.ReactNode,
    icon: React.ReactNode,
    color: "black" | "white",
    col:number,
  ) => {
    return label === "Profit/Loss" ? (
      <Columns className={"col-md-"+ col +" d-flex  flex-column align-items-center justify-content-between"}>
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id="button-tooltip" className="mytooltip">
              <TotalProfitLoss
                refresh={dependsOn % 2 == 0}
                poolAddress={poolAddress}
                fromOverlay={true}
              />
            </Tooltip>
          }
        >
          <ColumnsTitle1 className="w-100" color={"#B9B9B9"}>
           {icon} {label}
          </ColumnsTitle1>
        </OverlayTrigger>
        <ColumnsSubTitle color={color}>{value}</ColumnsSubTitle>
      </Columns>
    ) : (
      <Columns className={"col-md-"+col+" d-flex   flex-column align-items-center justify-content-between"}>
        <ColumnsTitle1 className="w-100" color={"#B9B9B9"}>
         {icon} {label}
        </ColumnsTitle1>
        <ColumnsSubTitle color={color}>{value}</ColumnsSubTitle>
      </Columns>
    );
  };

  const takeMoney = async () => {
    if (poolVersion === 3 || poolVersion === 4) {
      const poolContract = await getPoolContract(
        web3,
        poolAddress,
        poolVersion
      );
      const accounts = await web3.eth.getAccounts();
      await poolContract.methods.getGreyAmount().send({ from: accounts[0] });
      refresh();
    }
  };
  const takeExtraMoney = async () => {
    if (poolVersion === 3 || poolVersion === 4) {
      const poolContract = await getPoolContract(
        web3,
        poolAddress,
        poolVersion
      );
      const accounts = await web3.eth.getAccounts();
      await poolContract.methods
        .getInvestedAmount()
        .send({ from: accounts[0] });
      refresh();
    }
  };

  const renderFarmerUI = () => {
    if (isFarmer && (poolVersion === 3 || poolVersion === 4)) {
      return (
        <>
          <CardLabel color="white" className="mt-5">
            {" "}
            Tokens in Pool{" "}
          </CardLabel>
          <CardValue color="white">
            <DollarView poolAddress={poolAddress} tokenAmount={tokenInPool} />
          </CardValue>
          <CardLabel color="white" className="mt-5">
            {" "}
            Withdraw Requested
          </CardLabel>
          <CardValue color="white">
            {totalLp.isEqualTo(0)
              ? 0
              : withdrawLp.dividedBy(totalLp).multipliedBy(100).toFixed(0)}{" "}
            %
          </CardValue>
          <div className="d-flex mt-2 mb-2 justify-content-center">
            <ButtonWidget
              varaint="contained"
              fontSize="14px"
              className={"mr-3"}
              containedVariantColor="lightYellow"
              height="30px"
              width="150px"
              onClick={() => takeMoney()}
            >
              Take Tokens
            </ButtonWidget>
            <ButtonWidget
              varaint="contained"
              fontSize="14px"
              containedVariantColor="lightYellow"
              height="30px"
              width="160px"
              onClick={() => takeExtraMoney()}
            >
              Take Extra Tokens
            </ButtonWidget>
          </div>
          <div className="d-flex mt-2 mb-2 justify-content-center">
            <ButtonWidget
              fontSize="14px"
              varaint="contained"
              height="30px"
              containedVariantColor="lightYellow"
              width="150px"
              onClick={() => setIsAssignOpen(true)}
              className="ml-3"
            >
              Assign Lp Tokens
            </ButtonWidget>
            <ButtonWidget
              fontSize="14px"
              varaint="contained"
              height="30px"
              containedVariantColor="lightYellow"
              width="150px"
              onClick={() => setIsSendWithdraw(true)}
              className="ml-3"
            >
              Send Withdrawals
            </ButtonWidget>
          </div>
          <div className="d-flex mt-2 mb-2 justify-content-center">
            <ButtonWidget
              fontSize="14px"
              varaint="contained"
              height="30px"
              containedVariantColor="lightYellow"
              width="150px"
              onClick={() => setIsUpdateOpen(true)}
              className="ml-3"
            >
              Update Pool Value
            </ButtonWidget>
          </div>
        </>
      );
    }
  };
  return (
    <>
    {/* <DollarCardRoot>
     <CardDollar style={{filter: "drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.1))"}}/>
     </DollarCardRoot> */}
      <CardInnerInfo className="d-flex justify-content-center mb-3">
        <div style={{ marginTop: 30 }}>
          <>
            <CardLabel style={{marginBottom: 20}} color="white">
              {" "}
              My Current Holdings{" "}
            </CardLabel>
            <CardValue color="white" style={{marginBottom: 30}}>
              <DollarView
                poolAddress={poolAddress}
                tokenAmount={currentHoldings}
              />
            </CardValue>
          </>
          <div className="row mt-2 mb-1 justify-content-center">
            <ButtonWidget
              varaint="contained"
              fontSize="12px"
              className={clsx("mb-2",{"mr-3": isInvested})}
              containedVariantColor="lightYellow"
              height="30px"
              width="132px"
              onClick={() => setShowInvestmentPopup(true)}
            >
              Invest
            </ButtonWidget>

            

            {isInvested && (
              <ButtonWidget
                fontSize="14px"
                varaint="contained"
                height="30px"
                containedVariantColor="lightYellow"
                width="132px"
                onClick={() => setShowWithdrawPopup(true)}
              >
                Withdraw
              </ButtonWidget>
            )}

            {network.symbol === "BSC" &&
            <BoostButton />
          
           }
          </div>
          {renderFarmerUI()}
        </div>
      </CardInnerInfo>

      <div className="row mt-2 justify-content-center">
        {getSecondCardColumns(
          "Initial Investment",
          isUSD ? (
            `$${formatNum(initialInvestmentInUSD)}`
          ) : (
            <DollarView
              poolAddress={poolAddress}
              tokenAmount={initialInvestment}
            />
          ),
          <InvestmentIcon className="mr-1" />,
          "white",
          4
        )}

        {getSecondCardColumns(
          "Profit/Loss",
          <TotalProfitLoss
            refresh={dependsOn % 2 == 0}
            poolAddress={poolAddress}
          />,
          <ProfitIcon className="mr-1" />,
          "white",
          4
        )}
        {getSecondCardColumns(
          "My share",
          Number(myShare).toFixed(2) + " %",
          <LPShareIcon className="mr-1" />,
          "white",
          4
        )}
      </div>
      {showInvestmentPopup && (
        <InvestmentPopup
          poolVersion={poolVersion}
          poolAddress={poolAddress}
          onClose={() => setShowInvestmentPopup(false)}
          onSuccess={onSuccess}
        />
      )}

      {showWithdrawPopup && (
        <WithDrawPopup
          open
          poolVersion={poolVersion}
          onClose={() => setShowWithdrawPopup(false)}
          onError={() => {}}
          onSuccess={onSuccess}
          poolAddress={poolAddress}
        />
      )}
      {isUpdatePoolOpen && (
        <UpdatePoolDialog
          open={isUpdatePoolOpen}
          onClose={() => {
            setIsUpdateOpen(false);
            refresh();
          }}
          pool_address={poolAddress}
          poolVersion={poolVersion}
        />
      )}
      {isAssignOpen && (
        <AssignLpTokens
          open={isAssignOpen}
          onClose={() => {
            setIsAssignOpen(false);
            refresh();
          }}
          pool_address={poolAddress}
          poolVersion={poolVersion}
        />
      )}
      {isSendWithdrawOpen && (
        <SendWithdrawalsDialog
          open={isSendWithdrawOpen}
          onClose={() => {
            setIsSendWithdraw(false);
            refresh();
          }}
          pool_address={poolAddress}
          poolVersion={poolVersion}
        />
      )}
    </>
  );
};
