import { ClickAwayListener } from "@material-ui/core";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import {
  BugReportButton,
  Label,
  TextArea,
  Input,
} from "components/BugReportForm";
import { DonCommonmodal } from "components/DonModal";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import WalletPopup from "components/WalletPopup/WalletPopup";
import { getAuctionContract } from "Contracts";
import {
  BINANCE_CHAIN_ID,
  BSC_TESTNET_CHAIN_ID,
  useWeb3Context,
} from "don-components";
import {
  captureException,
  formatNum,
  getERCContract,
  getPoolContract,
  isOneOf,
  toEther,
  toWei,
} from "helpers";
import { useStakingContract, useSwitchNetwork } from "hooks";
import { IAuction, IAuctionSuccessState, IStoreState } from "interfaces";
import moment from "moment";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { usePopper } from "react-popper";
import { useDispatch, useSelector } from "react-redux";
import { fetchBidsAndLoansThunk } from "store/actions";
import { strapi } from "strapi";

type IBidFormState = {
  percentLp: string;
  selectedLp: number;
  commission: BigNumber;
};

const INITIAL_FORM_STATE: IBidFormState = {
  percentLp: "25",
  selectedLp: 0,
  commission: new BigNumber(0),
};

const calcCommisionPercent = (
  borrowAmount: BigNumber,
  commission: BigNumber
) => {
  return borrowAmount.isEqualTo(0)
    ? new BigNumber(0)
    : new BigNumber(commission).dividedBy(borrowAmount).multipliedBy(100);
};

const NewInput = (props: {
  value: string;
  onChange: (value: string) => void;
  validator: (value: string) => boolean;
}) => {
  const [value, setValue] = useState("");

  const lastValidValueRef = useRef(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const isValidValue = props.validator(value);

  if (isValidValue) {
    lastValidValueRef.current = value;
  }

  const onBlur = () => {
    if (lastValidValueRef.current !== value) {
      setValue(lastValidValueRef.current);
    }
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    const isValid = props.validator(value);
    if (isValid) {
      props.onChange(value);
    }
    setValue(value);
  };
  useEffect(() => {
    if (inputRef.current !== document.activeElement) {
      setValue(props.value);
    }
  }, [props.value]);

  return (
    <input
      ref={inputRef}
      value={value}
      style={{ width: value.length + "ch" }}
      onBlur={onBlur}
      onChange={handleChange}
    />
  );
};

const calcFloorCommission = (
  borrowAmount: BigNumber,
  floorCommission: string | number
) => {
  return borrowAmount.isEqualTo(0)
    ? borrowAmount
    : borrowAmount.multipliedBy(floorCommission).dividedBy(100);
};

// const

const BidFormDropDown = ({
  selectedOption,
  options,
  renderRow,
}: {
  selectedOption: any;
  options: any[];
  renderRow: (args: any, index: number) => React.ReactElement;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  const PopupContent = (
    <>
      {options.map((item, index) => {
        return renderRow(item, index);
      })}
    </>
  );
  const selectedIndex = options.findIndex((item) => item === selectedOption);
  const DefaultRow = renderRow(options[selectedIndex], selectedIndex);

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div
        ref={setReferenceElement}
        onClick={() => setIsOpen((val) => !val)}
        className="field bidformdropdown dropdown"
      >
        {DefaultRow}
        {isOpen && (
          <div
            ref={setPopperElement}
            style={styles.popper}
            className="bidformdropdown__elm"
            {...attributes.popper}
          >
            {PopupContent}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

const AuctionForm = ({ auction }: { auction: IAuction }) => {
  const [state, setState] = useState(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const { tier } = useStakingContract();

  const { getConnectedWeb3, address, chainId } = useWeb3Context();
  const selectedLp = auction.supportedLps[state.selectedLp];
  const { showProgress, showSuccess, showFailure } =
    useTransactionNotification();
  const selectNewLp = (index: number) => {
    setState((old) => ({ ...old, selectedLp: index }));
  };
  const [showWaitForCyclePopup, setShowWaitForCyclePopup] = useState(false);
  const maxDebtRatio = auction.maxDebtMap[tier.tier as 0] || "0";

  const balance = selectedLp.withdrawAmount || "10";

  const selectLpPercent = (percent: string) => {
    setState((old) => {
      const newState = { ...old, percentLp: percent };
      if (balance) {
        const borrowAmount = new BigNumber(balance)
          .multipliedBy(percent)
          .multipliedBy(maxDebtRatio)
          .dividedBy(100)
          .dividedBy(100);

        newState.commission = calcFloorCommission(
          borrowAmount,
          selectedLp.minCommission
        );
      }

      return newState;
    });
  };

  const debtAmount = useMemo(() => {
    return new BigNumber(isNaN(parseInt(state.percentLp)) ? 0 : state.percentLp)
      .multipliedBy(balance)
      .dividedBy(100);
  }, [state.percentLp, auction, selectedLp]);

  const minCommission = useMemo(() => {
    return debtAmount
      .multipliedBy(maxDebtRatio)
      .multipliedBy(selectedLp.minCommission)
      .dividedBy(10000);
  }, [selectedLp]);

  const validate = (val: string) => {
    return minCommission.lte(val);
  };
  console.log(balance, selectedLp.price, "val");
  const balanceInUsd = new BigNumber(balance)
    .multipliedBy(selectedLp.price)
    .toFixed(2);
  const borrowAmount = debtAmount.multipliedBy(maxDebtRatio).dividedBy(100);
  const debtAmountInUsd = debtAmount.multipliedBy(selectedLp.price).toFixed(2);

  const dispatch = useDispatch();
  useEffect(() => {
    setState((old) => {
      return {
        ...old,
        commission: calcFloorCommission(borrowAmount, selectedLp.minCommission),
      };
    });
  }, []);

  const { switchNetwork } = useSwitchNetwork();
  const commissionPer = calcCommisionPercent(borrowAmount, state.commission);
  const handleStake = async () => {
    const Auction = getAuctionContract(auction.address, BSC_TESTNET_CHAIN_ID);
    try {
      setIsLoading(true);
      showProgress("Lending Lp Token");

      await Auction.connectToWallet(getConnectedWeb3());
      const token = await getERCContract(
        getConnectedWeb3(),
        selectedLp.lpAddress
      );
      const lpBalance = await token.methods.balanceOf(address).call();
      const pool = await getPoolContract(
        getConnectedWeb3(),
        selectedLp.lpAddress,
        4
      );
      const availableWithdraw = new BigNumber(selectedLp.withdrawAmount!);
      const lendedAmount = availableWithdraw
        .multipliedBy(state.percentLp)
        .dividedBy(100)
        .toString();
      const greyAmount = await pool.methods
        .getUserGreyInvestedAmount(address)
        .call();

      const investedAmount = availableWithdraw.minus(toEther(greyAmount));
      if (investedAmount.lt(lendedAmount)) {
        return setShowWaitForCyclePopup(true);
      }

      const allowance = await token.methods
        .allowance(address, auction.address)
        .call();
      if (new BigNumber(allowance).lt(lpBalance)) {
        await token.methods
          .approve(auction.address, lpBalance)
          .send({ from: address });
      }

      await Auction.bid({
        lendedAmount: toWei(lendedAmount),
        comission: commissionPer.multipliedBy(100).toFixed(0),
        lpToken: selectedLp.lpAddress,
        userAddress: address,
      });

      await dispatch(fetchBidsAndLoansThunk(address));

      showSuccess("LP Token Lent Successfully");
    } catch (e) {
      captureException(e, "Handle Lp Lending");
      showFailure("Try again Later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={clsx("head")} style={{ marginBottom: "22px" }}>
        <h4>Make a Bid</h4>
        <div className="tooltip_con">
          <div className="tooltip_trigger info_icon">i</div>
          <div className="tooltip_content">
            <p>This is some demo text. please replace with what ever.</p>
          </div>
        </div>
      </div>
      <div className="lp_staking" style={{ marginBottom: "43px" }}>
        <div className="head">
          <h5>LP for staking</h5>
          <span className="data">≈ ${formatNum(balanceInUsd)}</span>
        </div>
        <div className="dropdown_container ">
          <BidFormDropDown
            selectedOption={selectedLp}
            options={auction.supportedLps}
            renderRow={(item, index) => {
              return (
                <div
                  key={item.lpAddress}
                  onClick={() => selectNewLp(index)}
                  className="option w-100 d-flex align-items-center justify-content-between"
                >
                  <div className="left d-flex align-items-center">
                    <div
                      className="icon"
                      style={{
                        backgroundImage: `url('${item.strategyImage}')`,
                      }}
                    ></div>
                    <div className="title font-weight-bold">
                      {item.strategyName}
                    </div>
                  </div>
                  <div className="right">
                    <div className="amount d-flex align-items-center">
                      <div
                        className="icon"
                        style={{
                          backgroundImage: `url('${item.tokenImage}')`,
                        }}
                      ></div>
                      <div className="amount">
                        {item.withdrawAmount} {item.symbol}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          ></BidFormDropDown>
        </div>
      </div>
      <div className="collateral">
        <div className="head">
          <h5>How much to use for collateral</h5>
          <span className="data">≈ ${formatNum(debtAmountInUsd)}</span>
        </div>
        <div className="field">
          <div className="option">
            <div className="left">
              <div className="icon pancake"></div>
              <input
                type="number"
                size={3}
                max={100}
                min={0}
                value={state.percentLp}
                onChange={(e) => {
                  const value = e.target.value;
                  if (parseFloat(value) > 100) {
                    return;
                  }
                  setState((old) => ({ ...old, percentLp: value }));
                }}
              />
              <div className="title x_amount">
                % {balance} {selectedLp!.symbol}
              </div>
            </div>
            <div className="right">
              <div className="amount">
                <div className="icon"></div>
                <div className="amount">
                  = {debtAmount.toFixed(2)} {selectedLp!.symbol}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="percent_select">
          <div
            className={clsx({ selected: state.percentLp === "25" })}
            onClick={() => selectLpPercent("25")}
          >
            25%
          </div>
          <div
            className={clsx({ selected: state.percentLp === "50" })}
            onClick={() => selectLpPercent("50")}
          >
            50%
          </div>
          <div
            className={clsx({ selected: state.percentLp === "70" })}
            onClick={() => selectLpPercent("70")}
          >
            70%
          </div>
          <div
            className={clsx({ selected: state.percentLp === "100" })}
            onClick={() => selectLpPercent("100")}
          >
            100%
          </div>
        </div>
      </div>
      <div className="borrow">
        <div className="reflection"></div>
        <div className="head">
          <h5>Borrow</h5>
          <div className="tooltip_con">
            <div className="tooltip_trigger info_icon">i</div>
            <div className="tooltip_content">
              <p>
                The Tier 5 will get {auction.maxDebtMap[5]}%, Tier 4 will get{" "}
                {auction.maxDebtMap[4]}%, and all the rest will get{" "}
                {auction.maxDebtMap[0]}%.
              </p>
              <a href="https://google.com">MORE INFO</a>
            </div>
          </div>
        </div>
        <h5>
          {borrowAmount.toFixed(2)} {selectedLp.symbol}
        </h5>
        <p>
          Collateral {debtAmount.toFixed(2)} {selectedLp.symbol} *{" "}
          {maxDebtRatio}% = {borrowAmount.toFixed(2)} {selectedLp!.symbol}{" "}
          <br /> Tier {tier.tier} Debt ratio is {maxDebtRatio}% <br />
          Min Commission is {selectedLp.minCommission}%
        </p>
      </div>

      <div className="bid">
        <div className="head">
          <h5>Bid (how much commision)</h5>
        </div>
        <div className="field">
          <div className="option">
            <div className="left">
              <div className="title">
                <NewInput
                  onChange={(e) =>
                    setState((old) => ({
                      ...old,
                      commission: new BigNumber(e),
                    }))
                  }
                  validator={validate}
                  value={state.commission.toFixed(2)}
                />{" "}
                {selectedLp!.symbol}
              </div>
            </div>
            <div className="right">
              <div className="amount">
                <div className="icon"></div>
                <div className="amount">{commissionPer.toFixed(2)}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="submit_btn_con">
        {chainId !== BSC_TESTNET_CHAIN_ID ? (
          <button
            className="submit_and_stake"
            onClick={() => switchNetwork(BSC_TESTNET_CHAIN_ID)}
            style={{ marginTop: "41px" }}
          >
            Switch Network
          </button>
        ) : (
          <button
            className="submit_and_stake"
            onClick={isLoading ? () => {} : handleStake}
            style={{ marginTop: "41px" }}
          >
            {isLoading ? <Spinner animation="border" /> : "Submit & Stake"}
          </button>
        )}
        <div className="info">
          <span>Floor commision {selectedLp.minCommission}%</span>
          <span>
            Repay loan date:{" "}
            {moment
              .unix(auction.endTime)
              .add(moment.duration(auction.tenure, "seconds"))
              .format("DD/MM/yyyy")}
          </span>
        </div>
      </div>
      {showWaitForCyclePopup && (
        <DonCommonmodal
          title="Wait for next cycle"
          isOpen
          variant="common"
          size="sm"
          onClose={() => {
            setShowWaitForCyclePopup(false);
          }}
        >
          you funds have not been assigned LP yet. You need to wait for next
          farming cycle before you can bid in auction
        </DonCommonmodal>
      )}
    </>
  );
};

const usePilotSuggestionApi = () => {
  const createSuggestion = async (args: {
    name: string;
    telegram: string;
    remarks: string;
  }) => {
    const resp = await strapi.post("/pilot-suggestions", args);
    return resp.data;
  };
  return { createSuggestion };
};

const validate = ({
  name,
  telegram,
  remarks,
}: {
  name: string;
  telegram: string;
  remarks: string;
}) => {
  if (!name) {
    return { valid: false, message: "Please Enter a name" };
  }
  if (name.length < 3) {
    return { valid: false, message: "Please Enter a valid name" };
  }
  if (!telegram) {
    return { valid: false, message: "Please enter Telegram Id" };
  }

  if (!remarks) {
    return { valid: false, message: "Please enter a remark" };
  }
  if (remarks.length < 10) {
    return {
      valid: false,
      message: "Remarks should have minimum 10 characters",
    };
  }

  return { valid: true };
};

const AuctionSuggestionForm = () => {
  const [formState, setState] = useState({
    name: "",
    telegram: "",
    remarks: "",
  });
  const [isCreating, setisCreating] = useState(false);
  const { showSuccess, showFailure } = useTransactionNotification();

  const { createSuggestion } = usePilotSuggestionApi();

  const handleCreate = async () => {
    setisCreating(true);
    try {
      const validationResult = validate(formState);
      if (!validationResult.valid) {
        showFailure(validationResult.message);
        return;
      }
      await createSuggestion(formState);
      showSuccess("Thank you for your Suggestion.");
      setState({ name: "", telegram: "", remarks: "" });
    } catch (e) {
      showFailure("Try Again Later");
    } finally {
      setisCreating(false);
    }
  };

  const handleChange =
    <K extends keyof typeof formState>(key: K) =>
    (e: { target: { value: string | File } }) => {
      const value = e.target.value;
      setState((old) => ({ ...old, [key]: value }));
    };

  return (
    <>
      <Label>
        Name
        <Input
          value={formState.name}
          onChange={handleChange("name")}
          placeholder="Livia Siphron"
        />
      </Label>
      <Label>
        Telegram
        <Input
          value={formState.telegram}
          onChange={handleChange("telegram")}
          placeholder="Telegram"
        />
      </Label>
      <Label>
        Your Remarks
        <br />
        <TextArea
          rows={5}
          value={formState.remarks}
          onChange={handleChange("remarks")}
          placeholder=""
        ></TextArea>
      </Label>
      <BugReportButton onClick={handleCreate}>
        {isCreating ? (
          <Spinner animation="border" size="sm" />
        ) : (
          "Send My suggestion"
        )}
      </BugReportButton>
    </>
  );
};

export const MakeABidForm = () => {
  const auctions = useSelector(
    (state: IStoreState) => state.auctions.auctionInfo
  );
  const prevAuctions = useSelector(
    (state: IStoreState) => state.auctions.prevAuctions
  );

  const { switchNetwork, chainId, connected } = useWeb3Context();
  const [isWalletPopupOpen, setIsWalletPopupOpen] = useState(false);
  const currentAuction =
    (auctions as IAuctionSuccessState).currentAuction || null;
  const nextAuction = (auctions as IAuctionSuccessState).nextAuction || null;
  // const prevAuction = (auctions as IAuctionSuccessState).lastAuction || null;
  const isReady = isOneOf(auctions.status, [
    "FETCH_SUCCESS",
    "FETCH_BALANCE_SUCCESS",
  ]);
  const isPilotOver = isReady && !currentAuction && !nextAuction;

  const renderForm = () => {
    if (isReady) {
      if (currentAuction) {
        return <AuctionForm auction={currentAuction} />;
      }
      if (!currentAuction && nextAuction) {
        return <AuctionForm auction={nextAuction} />;
      }
      if (isPilotOver) {
        return <AuctionSuggestionForm />;
      }
    }
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 500,
        }}
      >
        <Spinner animation="border" />
      </div>
    );
  };

  return (
    <div
      className={clsx("make_a_bid ", {
        "bg-white pb-5": isPilotOver,
        "mb-5": !isReady,
        "no-auction": prevAuctions.data.length === 0,
      })}
    >
      <div
        className={clsx({
          blurred:
            ((!currentAuction && nextAuction) ||
              !connected ||
              (chainId !== BSC_TESTNET_CHAIN_ID && connected)) &&
            !isPilotOver,
        })}
      >
        {renderForm()}
      </div>
      {chainId !== BSC_TESTNET_CHAIN_ID && connected && (
        <button
          className="connect_btn"
          onClick={() => switchNetwork(BSC_TESTNET_CHAIN_ID)}
          style={{ marginTop: "41px" }}
        >
          Switch Network
        </button>
      )}
      {!connected && (
        <button
          className="connect_btn"
          onClick={() => setIsWalletPopupOpen(true)}
          style={{ marginTop: "41px" }}
        >
          Connect Wallet
        </button>
      )}
      {isWalletPopupOpen && (
        <WalletPopup onClose={() => setIsWalletPopupOpen(false)} />
      )}
    </div>
  );
};
