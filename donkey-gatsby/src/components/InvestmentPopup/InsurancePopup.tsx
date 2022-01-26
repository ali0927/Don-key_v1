import { DonCommonmodal } from "components/DonModal";
import styled from "styled-components";
import { ButtonWidget as Button } from "components/Button";
import BigNumber from "bignumber.js";
import { memo, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { formatNum, hasMined, toEther } from "helpers";
import { useBrightClient } from "contexts/BrightUnionContext";
import { BINANCE_CHAIN_ID, useWeb3Context } from "don-components";
import { IInsuranceProps } from "interfaces";
import { factor, TokenImage } from "components/InvestBlackCard/InsuranceInfo";
import { waitFor } from "don-utils";
import { useDidUpdate, useStakingContract } from "hooks";
import { navigate } from "gatsby";
import { useDispatch } from "react-redux";
import { closePopup } from "store/actions";
const StyledP = styled.p`
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  color: #070602;
`;

// const calculateCoverAmount = (
//   args: IInsurance[],
//   amount: number | string | BigNumber,
//   duration: number
// ) => {
//   return args.reduce((prev, next) => {
//     if (typeof amount === "number" || typeof amount === "string") {
//       amount = new BigNumber(amount);
//     }
//     const totalAmount = amount
//       .multipliedBy(next.percent)
//       .dividedBy(100)
//       .multipliedBy(0.025)
//       .multipliedBy(duration / 365);
//     return prev + totalAmount.toNumber();
//   }, 0);
// };

const ButtonWidget = styled(Button)`
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
`;
const period = 30; // 90 days / 3 months

export const InsurancePopup = memo(
  ({
    open,
    onClose,
    value,
    Insurance = [],
    minAmountForInsurance,
    poolAddress,
    poolChainId,
  }: {
    open: boolean;
    onClose: () => void;
    value: string;
    poolAddress: string;
    poolChainId: number;
  } & IInsuranceProps) => {
    const { showSuccess, showProgress, showFailure } =
      useTransactionNotification();
    const { getConnectedWeb3, chainId, switchNetwork } = useWeb3Context();
    const [isLoading, setIsLoading] = useState(false);
    const { brightClient, refetch, buyQuote, getQuoteFrom } = useBrightClient();
    // value = new BigNumber(value).multipliedBy(factor).toFixed(2);
    const { tier } = useStakingContract();
    const [isReady, setIsReady] = useState(false);

    // Insurance = [Insurance[0]]
    const dispatch = useDispatch();
    const [calculatedValue, setCalculatedValue] = useState(value);
    const [coverCost, setCoverCost] = useState<string | number>("0");
    const [quotes, setQuotes] = useState<any>(null);
    const [showTierUpgradeInfo, setShowTierUpgradeInfo] = useState(false);

    const token = Insurance[0]?.token;
    // Insurance = [Insurance[0]];
    const symbol =
      token?.symbol || Insurance[0]?.protocol?.network?.tokenSymbol || "BNB";
    const insuranceChainId = token?.network?.chainId || poolChainId;

    const calculateValue = async () => {
      setIsReady(false);
      let calculatedAmount = new BigNumber(value).multipliedBy(factor);

      setCalculatedValue(calculatedAmount.toFixed(2));
      setIsReady(true);
    };

    useEffect(() => {
      calculateValue();
    }, [value]);

    const fetchQuotes = async (protocolList: any[]) => {
      console.log("Fetching QUotes");
      if (protocolList.length > 1) {
        const quotesArray = await Promise.all([
          brightClient.getMultipleQuotes(protocolList),
          ...protocolList.map((item) => getQuoteFrom(item)),
        ]);
        const [item, ...restarr] = quotesArray;
        setCoverCost(
          restarr.reduce(
            (prev, next) => prev.plus(toEther(next.price)),
            new BigNumber(0)
          )
        );
        return setQuotes(quotesArray);
      } else {
        // console.log(protocolList[0]);
        const quote = await getQuoteFrom(protocolList[0]);
        console.log(quote, "Quote");
        setCoverCost(
          [quote].reduce(
            (prev, next) => prev.plus(toEther(next.price)),
            new BigNumber(0)
          )
        );
        return setQuotes([quote]);
      }
    };

    useDidUpdate(() => {
      if (isReady && insuranceChainId === chainId) {
        const principal = new BigNumber(calculatedValue);
        const protocolList = Insurance.map((item) => {
          return {
            productId: item.protocol.productId,
            amount: principal
              .multipliedBy(item.percent)
              .dividedBy(100)
              .toFixed(2),
            currency: symbol.toUpperCase(),
            name: item.protocol.name,
            period,
            distributorName: "insurace",
          } as const;
        });
        // console.log(protocolList);
        fetchQuotes(protocolList);
      }
    }, [calculatedValue, isReady, chainId]);

    const handleInsurance = async () => {
      if(tier.tier < 1 || !tier.tier){
        setShowTierUpgradeInfo(true);
        return;
      }
      try {
        setIsLoading(true);
        showProgress("Purchasing Insurance");
        const web3 = getConnectedWeb3();

        let resp: any;
        if (Insurance.length > 1) {
          resp = await brightClient.buyQuotes(quotes[0]);
        } else {
          resp = await buyQuote(quotes[0]);
        }

        const txHash = resp.transactionHash || resp.success;
        if (txHash && (await hasMined(txHash, web3))) {
          await waitFor(5000);
          await refetch();
          showSuccess("Your amount has been Insured");
        } else {
          showFailure("Insurance Was Not SuccessFull");
        }

        onClose();
      } catch (e) {
        onClose();
        console.log(e);
        showFailure("Transaction Failed");
      }
    };


    const renderPopup = () => {
      if (showTierUpgradeInfo) {
        return (
          <div style={{ marginTop: -30, padding: "30px 0 10px" }}>
            <div className="d-flex justify-content-center"></div>
            <StyledP>
              This strategy offers insurance against hacks and exploits. If you
              wish to purchase a policy you need to first be a tier 1 or higher
              Don-key member.
              <a
                style={{ fontSize: 14 }}
                className="font-weight-normal"
                href="https://brightunion.medium.com/don-key-finance-first-defi-asset-manager-to-offer-in-app-insurance-2f9ee6e43770"
              >
                Read more
              </a>
            </StyledP>
            <div className="d-flex align-items-center mt-5">
              <ButtonWidget
                onClick={onClose}
                varaint="contained"
                height="40px"
                className="py-2 mr-3"
                containedVariantColor="black"
              >
                Cancel
              </ButtonWidget>
              <ButtonWidget
                height="40px"
                onClick={() => {
                  navigate("/stake");
                  dispatch(closePopup("INSURANCE_POPUP"));
                }}
                varaint="contained"
                className="py-2 mr-3"
                containedVariantColor="lightYellow"
              >
                Stake Don
              </ButtonWidget>
            </div>
          </div>
        );
      }
      if (insuranceChainId !== chainId) {
        return (
          <>
            {" "}
            <StyledP>
              Switch Network to {token?.network?.name} in Order to Buy Insurance
            </StyledP>
            <div className="d-flex align-items-center mt-4">
              <ButtonWidget
                onClick={onClose}
                varaint="contained"
                height="40px"
                className="py-2 mr-3"
                containedVariantColor="black"
              >
                Cancel
              </ButtonWidget>
              <ButtonWidget
                height="40px"
                onClick={() =>
                  switchNetwork(token?.network?.chainId || BINANCE_CHAIN_ID)
                }
                varaint="contained"
                className="py-2 mr-3"
                containedVariantColor="lightYellow"
              >
                Switch
              </ButtonWidget>
            </div>
          </>
        );
      }
      if (!isReady || !quotes) {
        return (
          <div className="d-flex justify-content-center align-items-center py-5">
            <Spinner animation="border" className="my-5" />
          </div>
        );
      }

      if (!new BigNumber(calculatedValue).gte(minAmountForInsurance || "0")) {
        return (
          <div>
            <StyledP>
              Required Minimum Insurance Amount {minAmountForInsurance} {symbol}
            </StyledP>
            <p className="text-center my-1">
              {" "}
              Amount to Insure: {formatNum(calculatedValue)} {symbol} <br />
            </p>
            <p className="text-center my-1">Duration of Coverage: 1 month</p>
            <div className="d-flex align-items-center mt-4">
              <ButtonWidget
                onClick={onClose}
                varaint="contained"
                height="40px"
                className="py-2 mr-3"
                containedVariantColor="black"
              >
                Cancel
              </ButtonWidget>
              <ButtonWidget
                height="40px"
                onClick={onClose}
                varaint="contained"
                className="py-2 mr-3"
                containedVariantColor="lightYellow"
              >
                {isLoading ? (
                  <Spinner size="sm" animation="border" />
                ) : (
                  "Invest More"
                )}
              </ButtonWidget>
            </div>
          </div>
        );
      }

      return (
        <>
          {" "}
          <StyledP>
            Do you want to insure your investment against the underlying
            protocols being hacked?{" "}
          </StyledP>
          <div className="d-flex flex-column align-items-center">
            Following Protocols will Be Insured:
            <ul className="list-unstyled mb-0">
              {Insurance.map((item) => {
                return (
                  <li
                    className="mb-1"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <TokenImage src={item.protocol.icon.url} />
                    {item.protocol.name} ({item.percent}%)
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="text-center my-1">
            Insured Amount: {formatNum(calculatedValue)} {symbol} <br />
            Cost of Insurance: ~ {formatNum(coverCost)} {symbol}
          </p>
          <p className="text-center my-1">Duration of Coverage: 1 month</p>
          <p className="d-flex justify-content-center">
            {" "}
            <a
              style={{ fontSize: 14 }}
              className="font-weight-normal"
              href="https://brightunion.medium.com/don-key-finance-pilots-with-first-covered-yield-farming-strategy-911c12e1bfda"
            >
              More Details
            </a>
          </p>
          <div className="d-flex align-items-center mt-4">
            <ButtonWidget
              onClick={onClose}
              varaint="contained"
              height="40px"
              className="py-2 mr-3"
              containedVariantColor="black"
            >
              Cancel
            </ButtonWidget>
            <ButtonWidget
              height="40px"
              onClick={handleInsurance}
              varaint="contained"
              className="py-2 mr-3"
              containedVariantColor="lightYellow"
            >
              {isLoading ? <Spinner size="sm" animation="border" /> : "Yes"}
            </ButtonWidget>
          </div>
        </>
      );
    };

    return (
      <DonCommonmodal
        title=""
        size="xs"
        variant="common"
        onClose={onClose}
        isOpen={open}
      >
        {renderPopup()}
      </DonCommonmodal>
    );
  }
);
