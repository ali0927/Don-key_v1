
import BigNumber from "bignumber.js";
import clsx from "clsx";
import { BugReportButton, Label, TextArea, Input } from "components/BugReportForm";
import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import { getAuctionContract } from "Contracts";
import { BSC_TESTNET_CHAIN_ID, useWeb3Context } from "don-components";
import { captureException, formatNum, isOneOf, toWei, validateEmail } from "helpers";
import { useStakingContract, useSwitchNetwork } from "hooks";
import { IAuction, IAuctionSuccessState, IStoreState } from "interfaces";
import moment from "moment";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBidsAndLoansThunk } from "store/actions";
import { strapi } from "strapi";

const Dropdown: React.FC = (props) => {
  const [condition, setCondition] = useState(false);
  return (
    <div
      onClick={() => setCondition(!condition)}
      className={condition ? "field dropdown active" : "field dropdown"}
    >
      {props.children}
    </div>
  );
};

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
  return borrowAmount.isEqualTo(0) ? new BigNumber(0): new BigNumber(commission).dividedBy(borrowAmount).multipliedBy(100);
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
      onBlur={onBlur}
      onChange={handleChange}
    />
  );
};

const calcFloorCommission = (
  borrowAmount: BigNumber,
  floorCommission: string | number
) => {
  return borrowAmount.isEqualTo(0) ? borrowAmount: borrowAmount.multipliedBy(floorCommission).dividedBy(100);
};

const transformArray = <T extends any>(arr: T[], index: number) => {
  if (arr.length > 2) {
    return [
      arr[index],
      ...arr.slice(0, index),
      ...arr.slice(index + 1, arr.length),
    ];
  }
  return [...arr].reverse();
};

const AuctionForm = ({
  auction,
}: {
  status: IStoreState["auctions"]["auctionInfo"]["status"];
  auction: IAuction;
}) => {
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
  const maxDebtRatio = auction.maxDebtMap[tier.tier as 0] || "0";

  const balance = formatNum(selectedLp.withdrawAmount || "10");

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

  const balanceInUsd = new BigNumber(balance)
    .multipliedBy(selectedLp.price)
    .toFixed(2);

  const borrowAmount = debtAmount.multipliedBy(maxDebtRatio).dividedBy(100);
  const debtAmountInUsd = debtAmount.multipliedBy(selectedLp.price).toFixed(2);
  const borrowAmountInUsd = borrowAmount
    .multipliedBy(selectedLp.price)
    .toFixed(2);

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

      await Auction.bid({
        lendedAmount: toWei(
          new BigNumber(selectedLp.balance!)
            .multipliedBy(state.percentLp)
            .dividedBy(100)
            .toString()
        ),
        comission: commissionPer.multipliedBy(100).toFixed(0),
        lpToken: selectedLp.lpAddress,
        userAddress: address,
      });

      await dispatch(fetchBidsAndLoansThunk(address));

      showSuccess("LP Token Lent Successfully");
    } catch (e) {
      console.trace();
      captureException(e, "Handle Lp Lending");
      showFailure("Try again Later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="head" style={{ marginBottom: "22px" }}>
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
        <div className="dropdown_container">
          <Dropdown>
            {transformArray(auction.supportedLps, state.selectedLp).map(
              (item, index) => {
                return (
                  <div
                    key={item.lpAddress}
                    onClick={() => selectNewLp(index)}
                    className="option"
                  >
                    <div className="left">
                      <div
                        className="icon"
                        style={{
                          backgroundImage: `url('${item.tokenImage}')`,
                        }}
                      ></div>
                      <div className="title">{item.strategyName}</div>
                    </div>
                    <div className="right">
                      <div className="amount">
                        <div
                          className="icon"
                          style={{
                            backgroundImage: `url('${item.tokenImage}')`,
                          }}
                        ></div>
                        <div className="amount">
                          {balance} {item.symbol}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </Dropdown>
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
          {maxDebtRatio}% = {borrowAmount.toFixed(2)} {selectedLp!.symbol} Tier{" "}
          {tier.tier} Debt ratio is {maxDebtRatio}% <br />
          {selectedLp.strategyName} Min Commission is {selectedLp.minCommission}
          %
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
              .format("DD/mm/yyyy")}
          </span>
        </div>
      </div>
    </>
  );
};



const usePilotSuggestionApi = () => {
  const createSuggestion = async (args:{name: string, email:string, remarks: string}) => {
    const resp = await strapi.post("/pilot-suggestions",args);
    return resp.data;
  }
  return {createSuggestion}
}


const validate = ({name, email, remarks}: {name: string; email: string; remarks: string}) => {
  if(!name){
    return {valid: false, message: "Please Enter a name"};
  }
  if(name.length < 3){
    return {valid: false, message: "Please Enter a valid name"};
  }
  if(!email){
    return {valid: false, message: "Please enter an email"};
  }
  if(!validateEmail(email)){
    return {valid: false, message: "Please enter a valid email"}
  }
  if(!remarks){
    return {valid: false, message: "Please enter a remark"};
  }
  if(remarks.length < 10){
    return {valid: false, message: "Remarks should have minimum 10 characters"};
  }

  return {valid: true};

}

const AuctionSuggestionForm = () => {
  const [formState, setState] = useState({ name: "", email: "", remarks: "" });
  const [isCreating, setisCreating] = useState(false);
  const {showSuccess, showFailure} = useTransactionNotification();

  const {createSuggestion} = usePilotSuggestionApi();

  const handleCreate = async () => {
    setisCreating(true);
    try {
      const validationResult = validate(formState);
      if(!validationResult.valid){
        showFailure(validationResult.message);
        return;
      }
      await createSuggestion(formState);
      showSuccess("Thank you for your Suggestion.");
      setState({name:"", email: "", remarks: ""});
    }catch(e){
      showFailure("Try Again Later");
    }finally {
      setisCreating(false);
    }
  }


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
        Email
        <Input
          value={formState.email}
          onChange={handleChange("email")}
          placeholder="Your Email"
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
        {isCreating ? <Spinner animation="border" size="sm" /> : "Send My suggestion"}
      </BugReportButton>
    </>
  );
};

export const MakeABidForm = () => {
  const auctions = useSelector(
    (state: IStoreState) => state.auctions.auctionInfo
  );
  const currentAuction =
    (auctions as IAuctionSuccessState).currentAuction || null;
  const nextAuction = (auctions as IAuctionSuccessState).nextAuction || null;
  const isReady = isOneOf(auctions.status, ["FETCH_SUCCESS", "FETCH_BALANCE_SUCCESS"]);
  const isPilotOver = isReady &&  !currentAuction && !nextAuction;

  const renderForm = () => {
    if (isReady) {
      if (currentAuction) {
        return (
          <AuctionForm status={auctions.status} auction={currentAuction} />
        );
      }
      if (!currentAuction && nextAuction) {
        return "Wait For Next Auction To Start";
      }
      if (isPilotOver) {
        return <AuctionSuggestionForm />
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

  return <div className={clsx("make_a_bid ", {"bg-white pb-5": isPilotOver})}>{renderForm()}</div>;
};
