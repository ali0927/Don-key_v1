import { useState, useEffect } from "react";
import { InvestmentPopup } from "components/InvestmentPopup";
import { shortenAddress } from "don-utils";
import { useMediaQuery } from "@material-ui/core";
import { TotalProfitLoss } from "components/TotalProfitLoss";
import { useIsInvested } from "hooks/useIsInvested";
import { WithDrawPopup } from "components/WithDrawPopup";
import {
  formatNum,
  getAmount,
  getPoolContract,
  getPoolToken,
  toEther,
} from "helpers";
import { ButtonWidget } from "components/Button";
import { useROIAndInitialInvestment } from "hooks/useROIAndInitialInvestment";
import BigNumber from "bignumber.js";
import { useUSDViewBool } from "contexts/USDViewContext";
import { DollarView } from "components/DollarView";
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
  CardInnerInfo,
} from "components/DetailTable";
import { LPShareIcon, ProfitIcon } from "icons";
import { INetwork } from "interfaces";
import { BoostButton } from "components/BoostButton";
import { useWeb3Context } from "don-components";

export const InvestBlackCard = ({
  poolAddress,
  poolVersion,
  network,
  boostApy,
  isWithdrawRequested
}: {
  poolAddress: string;
  poolVersion: number;
  network: INetwork;
  boostApy: boolean;
  isWithdrawRequested?: boolean;
}) => {
  const { refresh, dependsOn } = useRefresh();
  const isSmall = useMediaQuery(`@media screen and (max-width:400px)`);
  const finalPoolAddress = isSmall ? shortenAddress(poolAddress) : poolAddress;
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);
  const { getIsInvested, isInvested } = useIsInvested(poolAddress);
  const [currentHoldings, setCurrentHoldings] = useState("0");

  const [showInvestmentPopup, setShowInvestmentPopup] = useState(false);

  const { isUSD } = useUSDViewBool();
  const [isFarmer, setIsFarmer] = useState(false);
  const [tokenInPool, setTokeninPool] = useState("0");
  const [isUpdatePoolOpen, setIsUpdateOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isSendWithdrawOpen, setIsSendWithdraw] = useState(false);
  const { getConnectedWeb3, address } = useWeb3Context();
  const web3 = getConnectedWeb3();
  const checkIsFarmer = async () => {
    if (poolVersion === 3 || poolVersion === 4) {
      try {
        const poolContract = await getPoolContract(
          web3,
          poolAddress,
          poolVersion
        );
        const farmerAddress =
          poolVersion === 4
            ? await poolContract.methods.adminAddress().call()
            : await poolContract.methods.getFarmerAddress().call();
        const accounts = await web3.eth.getAccounts();
        if (farmerAddress === accounts[0]) {
          setIsFarmer(true);
        }
        const poolToken = await getPoolToken(web3, poolAddress);
        const poolTokenAmount = await poolToken.methods
          .balanceOf(poolAddress)
          .call();
        const decimals = await poolToken.methods.decimals().call();
        setTokeninPool(toEther(poolTokenAmount, decimals));
      } catch (e: any) {
        console.log(e.message, "Error In Farmer");
      }
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
      if (address) {
        let withdrawAmount = await getAmount(
          web3,
          poolAddress,
          address,
          poolVersion
        );
        console.log(withdrawAmount, "withdraw")
        setCurrentHoldings(withdrawAmount);
        getIsInvested();

        fetchRoi();
      }
    }
    apiCall();
    if (process.env.GATSBY_SHOW_ADMIN) {
      checkIsFarmer();
      fetchWithdrawShare();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependsOn]);

  const onSuccess = () => {
    setShowWithdrawPopup(false);
    refresh();
  };
  const connectedWeb3 = getConnectedWeb3();
  const { initialInvestment, myShare, initialInvestmentInUSD, fetchRoi } =
    useROIAndInitialInvestment(
      connectedWeb3,
      finalPoolAddress,
      dependsOn % 2 == 0,
      true
    );
  const getSecondCardColumns = (
    label: string,
    value: string | React.ReactNode,
    icon: React.ReactNode,
    color: "black" | "white",
    col: number
  ) => {
    return label === "Profit/Loss" ? (
      <Columns
        className={
          "col-md-" +
          col +
          " col-4 d-flex  flex-column align-items-center  justify-content-between"
        }
      >
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id="button-tooltip" className="mytooltip">
              <TotalProfitLoss
                chainId={network.chainId}
                refresh={dependsOn % 2 == 0}
                poolAddress={poolAddress}
                poolVersion={poolVersion}
                fromOverlay={true}
              />
            </Tooltip>
          }
        >
          <ColumnsTitle1 className="w-100" color={"#B9B9B9"}>
            <span> {icon}</span> <span>{label}</span>
          </ColumnsTitle1>
        </OverlayTrigger>
        <ColumnsSubTitle className="text-uppercase" color={color}>
          {value}
        </ColumnsSubTitle>
      </Columns>
    ) : (
      <Columns
        className={
          "col-md-" +
          col +
          " col-4 d-flex   flex-column align-items-center justify-content-between"
        }
      >
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
    if (process.env.GATSBY_SHOW_ADMIN) {
      if (isFarmer && (poolVersion === 3 || poolVersion === 4)) {
        return (
          <>
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
            <CardLabel color="white" className="mt-5">
              {" "}
              Tokens in Pool{" "}
            </CardLabel>
            <CardValue color="white">
              <DollarView
                chainId={network.chainId}
                poolAddress={poolAddress}
                tokenAmount={tokenInPool}
              />
            </CardValue>
            <CardLabel color="white" className="mt-5">
              {" "}
              Withdraw Requested
            </CardLabel>
            <CardValue color="white">
              {totalLp.isEqualTo(0)
                ? 0
                : withdrawLp
                    .dividedBy(totalLp)
                    .multipliedBy(100)
                    .toFixed(6)}{" "}
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
    }
  };
  return (
    <>
      <CardInnerInfo className="d-flex justify-content-center mb-3">
        <div style={{ marginTop: 30 }}>
          <>
            <CardLabel style={{ marginBottom: 20 }} color="white">
              {" "}
              My Current Holdings{" "}
            </CardLabel>
            <CardValue color="white" style={{ marginBottom: 30 }}>
              <DollarView
                chainId={network.chainId}
                poolAddress={poolAddress}
                tokenAmount={currentHoldings}
              />
            </CardValue>
          </>
          <div className="row mt-2 mb-1 justify-content-center">
            <ButtonWidget
              varaint="contained"
              fontSize="14px"
              className={clsx("mb-2", { "mr-3": isInvested })}
              containedVariantColor="lightYellow"
              height="30px"
              width="132px"
              onClick={() => setShowInvestmentPopup(true)}
            >
              Invest
            </ButtonWidget>

            {isInvested && !isWithdrawRequested && (
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

            {network.symbol === "BSC" && boostApy && (
              <BoostButton className="ml-3 d-none d-md-block " />
            )}
          </div>
          {renderFarmerUI()}
        </div>
      </CardInnerInfo>

      <div className="row mt-2 flex-nowrap justify-content-center no-gutters">
        {getSecondCardColumns(
          "Initial Investment",
          isUSD ? (
            `$${formatNum(initialInvestmentInUSD)}`
          ) : (
            <DollarView
              chainId={network.chainId}
              poolAddress={poolAddress}
              variant="multiline"
              tokenAmount={initialInvestment}
            />
          ),
          <svg
            width={17}
            height={17}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#prefix__clip0_invest)" fill="#B9B9B9">
              <path d="M8.752 11.49v-.067a13.67 13.67 0 01-.975-.048c-.17.438-.409.846-.707 1.21.563.093 1.133.144 1.704.151l-.022-1.247zM7.26 9.054A3.694 3.694 0 004.751 6.29a3.7 3.7 0 00-3.554.791 3.67 3.67 0 00-.243 5.18A3.669 3.669 0 007.26 9.055zM3.666 9.3a1.39 1.39 0 01.375 2.726v.324a.369.369 0 01-.368.368.369.369 0 01-.368-.368v-.32a1.398 1.398 0 01-1.03-1.343c0-.202.166-.368.368-.368.202 0 .368.166.368.368a.653.653 0 10.651-.655c-.629 0-1.177-.423-1.34-1.03a1.396 1.396 0 01.987-1.7v-.158c0-.202.165-.368.368-.368.202 0 .368.166.368.368v.166c.6.169 1.012.717 1.012 1.339a.369.369 0 01-.368.368.369.369 0 01-.368-.368.656.656 0 00-.655-.655.653.653 0 100 1.306zM8.74 10.684L8.718 9.38a12.762 12.762 0 01-.666-.026 4.524 4.524 0 01-.066 1.295 8.4 8.4 0 00.754.034zM12.77 4.595c-.255.132-.523.239-.8.32-.827.25-1.913.386-3.046.386-1.085 0-2.119-.125-2.917-.357a4.077 4.077 0 01-.795-.305l.026 1.037c.415.155.802.376 1.151.652.011.003.019.003.03.007.706.18 1.597.276 2.505.276 1.053 0 2.087-.133 2.833-.357.799-.243.975-.497.975-.545 0-.051-.003-.099.037-.15v-.964zM11.755 3.134c-.747-.228-1.78-.357-2.833-.357-1.06 0-2.053.129-2.796.357-.776.235-.946.467-.95.54 0 0 .004 0 .004.008.019.08.24.331 1.03.56.733.213 1.697.33 2.712.33 1.053 0 2.083-.128 2.83-.353.798-.24.978-.493.978-.544 0-.048-.176-.298-.975-.541zM16.992 13.314V12.21a4.719 4.719 0 01-.773.313c-.824.25-1.902.386-3.039.386-1.008 0-1.99-.114-2.763-.316a4.79 4.79 0 01-.916-.335l.019 1.067v.008c0 .055.161.301.938.54.736.225 1.729.35 2.792.35 1.06 0 2.057-.129 2.8-.36.777-.243.946-.497.946-.549h-.004zM12.761 6.647a4.647 4.647 0 01-.795.317c-.828.25-1.913.386-3.05.386-.56 0-1.115-.037-1.667-.107.298.412.52.876.659 1.37.316.021.659.036 1.012.036h.037c.603-.662 2.225-.994 3.804-1.038v-.964zM16.194 10.488c-.821.243-1.888.376-3.006.376-1.086 0-2.12-.125-2.918-.357a4.514 4.514 0 01-.802-.31l.014.847.004.309c.287.357 1.66.817 3.698.817 1.063 0 2.068-.125 2.822-.353.795-.243.968-.493.968-.545 0-.04.022-.085.022-.121h.003v-.975c-.257.128-.526.239-.805.312zM16.022 8.704c-.75-.228-1.78-.35-2.833-.35h-.062c-.98 0-1.91.11-2.624.313-.761.213-1.023.456-1.056.556-.003.007-.003.01-.003.014l.007.015c.022.077.24.327 1.03.56.732.209 1.696.327 2.712.327 1.048 0 2.042-.122 2.796-.346.817-.243 1-.497 1.005-.552v-.004c-.004-.055-.188-.298-.972-.533z" />
            </g>
            <defs>
              <clipPath id="prefix__clip0_invest">
                <path fill="#fff" d="M0 0h17v17H0z" />
              </clipPath>
            </defs>
          </svg>,

          "white",
          4
        )}

        {getSecondCardColumns(
          "Profit/Loss",
          <TotalProfitLoss
            chainId={network.chainId}
            refresh={dependsOn % 2 == 0}
            poolAddress={poolAddress}
            poolVersion={poolVersion}
            variant="multiline"
          />,
          <ProfitIcon className="mr-md-1" />,
          "white",
          4
        )}
        {getSecondCardColumns(
          "My share",
          <span className="d-flex flex-column d-md-block align-items-center">
            <span>{Number(myShare).toFixed(2) + " %"}</span>
            <span className="d-md-none" style={{ opacity: 0 }}>
              %
            </span>
          </span>,
          <LPShareIcon className="mr-md-1" />,
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
    </>
  );
};
