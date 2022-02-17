import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import React, { useRef, useState } from "react";
import { Spinner, OverlayTrigger, Tooltip } from "react-bootstrap";
import styled, { css } from "styled-components";
import { SuccessOverlay } from "./SuccessOverlay";
import coolicon from "./coolicon.svg";
import { useRiskAndNetworkList, ErrorModal } from "./Suggest";
import {
  BsTriangleFill,
  BsArrowRight,
  BsArrowLeft,
  BsQuestionCircle,
} from "react-icons/bs";
import { DonCommonmodal } from "components/DonModal";
import { ShowMoreContent } from "components/ShowmoreContent";
import { theme } from "theme";
import { ClickAwayListener } from "@material-ui/core";
import clsx from "clsx";
import {
  useSuggestionApi,
  useSignin,
  useStakingContract,
  useEffectOnTabFocus,
} from "hooks";
import { AiFillCaretDown } from "react-icons/ai";
import ExampleSuggetionImg from "../../images/exmaple-suggestion.png";
import { useWeb3Context } from "don-components";
import { useSelector } from "react-redux";
import { IStoreState } from "store/reducers/rootReducer";
import WalletPopup from "components/WalletPopup/WalletPopup";
import { captureException } from "helpers";

const InputFieldCSS = css`
  background: rgba(245, 245, 245, 0.5);
  border: 1px solid rgba(245, 245, 245, 0.5);
  border-radius: 10px;
  width: 100%;
  padding: 15px 20px;
  &::placeholder {
    color: #767b86;
  }
  margin-top: 10px;
  margin-bottom: 20px;
  font-weight: 500;
  &:focus {
    outline: none;
    background-color: #fff;
    border: 1px solid rgba(245, 245, 245, 1);
  }
`;
export const Input = styled.input`
  ${InputFieldCSS}
`;
export const TextArea = styled.textarea`
  ${InputFieldCSS}
`;
export const Label = styled.label`
  color: #222222;
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 17px;
  font-weight: 600;
  display: block;
`;

export const Select = styled.select`
  ${InputFieldCSS}
  outline: none;

  border: 1px solid rgba(0, 0, 0, 0.5);
  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.5);
  }
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #fff url(${coolicon}) no-repeat calc(100% - 34px) center/8px;
  ${theme.mediaQueries.md.down} {
    background: #fff url(${coolicon}) no-repeat calc(100% - 20px) center/8px;
    padding-right: 40px;
  }
`;
export const Form = styled.div`
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 9.951690673828125px 59.710147857666016px 0px #262d7614;
  padding: 60px;
  @media (max-width: 600px) {
    padding: 20px 10px;
  }
`;
export const SuggestRequestButton = styled.button`
  padding: 16px;
  font-weight: 500;
  font-size: 14px;
  color: #fff;
  border-radius: 10px;
  background: linear-gradient(146.14deg, #353a4b 0%, #0b0e12 100%);
  border: 0;
  display: block;
  width: 100%;
  &:disabled {
    opacity: 0.8;
  }
`;

const INITIAL_STATE = {
  title: "",
  description: "",
  nickName: "",
  telegram: "",
  address: "",
  network: 1,
  apy: 10,
  riskword: "",
  risk: 0,
};
export type ISuggestFormState = typeof INITIAL_STATE;

//@ts-ignore
const validateEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const SmallSpan = styled.span`
  font-size: 12px;
  color: #767b86;
  font-weight: normal;
`;
const APYPercent = styled.label`
  position: absolute;
  right: 10px;
  top: 28px;
`;
const RiskLevel = styled.div`
  background: ${(props: { color: string }) => props.color};
  width: 20%;
  height: 15px;
  margin: 2px;
  margin-bottom: 60px;
  cursor: pointer;
`;
const RiskLevelSelector = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
  align-items: ${(props: { level: number }) =>
    props.level === 0
      ? "flex-end"
      : props.level === 1
      ? "center"
      : "flex-start"};
`;
const RiskLevelSelectorIcon = styled(BsTriangleFill)`
  color: ${(props: { color: string }) => props.color};
`;
const ShowExampleSuggestionBtn = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  font-size: 0.8rem;
  margin: 10px auto;
`;
const ExampleSuggetionBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 20px;
  background: #fbfbfb;
`;
const RiskImage = styled.img`
  width: 100px;
  @media (max-width: 568px) {
    display: none;
  }
`;
const SuggetionImage = styled.img`
  width: 60px;
  height: 60px;
  over-flow: hidden;
  border-radius: 10px;
  margin: 10px 6px;
  cursor: pointer;
  border: ${(props: { selected: boolean }) =>
    props.selected ? "1px solid orange" : "none"};
`;
const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;
const ExampleSuggestionTitle = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
`;
const ExampleSuggetionContent = styled.div`
  font-size: 1rem;
  overflow-wrap: anywhere;
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;
const ExampleList = styled.div`
  display: flex;
  overflow-x: auto;
  justify-content: center;
  @media (max-width: 600px) {
    justify-content: normal;
  }
`;
const DropdownBtn = styled.div`
  border: 1px solid #222222;
  padding: 15px;
  margin: 10px 0;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #000;
  text-transform: capitalize;
  ${(props: { active?: boolean }) =>
    props.active &&
    `
      background: #000;
      color:#fff;
    `}
  .icon {
    font-size: 20px;
    margin-left: 10px;
  }
`;

const DropDown = styled.ul`
  position: absolute;
  top: 62px;
  left: 0;
  background: #c0c0c0;
  padding: 10px 0px;
  list-style: none;
  display: flex;
  flex-direction: column;
  z-index: 50;
  color: white;
  border-radius: 5px;
  width: 100%;
  h4 {
    padding-bottom: 15px;
    border-bottom: 1px solid #e5e5e5;
  }
  .selected {
    background: #201f1f;
  }
  @media (max-width: 568px) {
    position: fixed;
    z-index: 1;
    padding: 20px 0px;
    background: #000000;
    top: auto;
    left: 0;
    right: 0;
    bottom: -16px;
    min-height: 34vh;
    border-radius: 24px 24px 0 0;
    overflow-x: hidden;
    transition: 0.5s;
  }
`;
const Overlay = styled.div`
  @media (max-width: 568px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 40;
  }
`;
const DropDownItem = styled.li`
  padding: 10px 32px;
  padding-right: 54px;
  cursor: pointer;
  display: flex;
  text-transform: capitalize;
  .tick-icon {
    display: none;
  }
  &:hover {
    background: #201f1f;
  }

  @media (max-width: 568px) {
    &:hover {
      .tick-icon {
        display: block;
      }
    }
  }
`;
const ExampleSuggetionAPY = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin: 24px 0px;
  @media (max-width: 568px) {
    display: none;
  }
`;

const generateRandomText = (length: number) => {
  const characters = " abcdefghijklm nopqrstuvwxyz ";
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const renderTooltipFees = (props: any) => (
  <Tooltip id="button-tooltip" {...props} className="mytooltip">
    <strong>
      Please address the risks in terms of: Impermanent loss, platform risk,
      audits and TVL in the pools
    </strong>
  </Tooltip>
);

const renderRiskLevelSelector = (risks: any, riskLevel: number) => {
  const risk = risks.find((item: any) => item.strapiId === riskLevel);
  const color =
    riskLevel === 1
      ? "#FF4500"
      : riskLevel === 5
      ? "#32CD32"
      : riskLevel === 6
      ? "orange"
      : riskLevel === 2
      ? "#FFD700"
      : "#00BFFF";
  if (!risk) return;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "16px",
        alignItems: "center",
      }}
    >
      <RiskLevelSelectorIcon color={color} />
      <label style={{ textAlign: "center" }}>{risk.Title}</label>
    </div>
  );
};

const ExampleSuggestions = (): Array<any> => {
  let _example = new Array(5).fill(0).map((item) => {
    return {
      title: generateRandomText(15),
      apy: 12.123,
      name: generateRandomText(10),
      description: generateRandomText(300),
      risk: 2,
      date: "15 Jan 2022 15:30",
      category: "Payments",
    };
  });
  return _example;
};

const validate = (state: typeof INITIAL_STATE) => {
  if (!state.nickName) {
    return { isValid: false, message: "Please input Nick Name" };
  }
  if (!state.title) {
    return { isValid: false, message: "Please input Title" };
  }
  if (!state.description) {
    return { isValid: false, message: "Please input Suggestion Flow" };
  }
  if (!state.telegram) {
    return { isValid: false, message: "Please input telegram account" };
  }
  if (!state.riskword) {
    return { isValid: false, message: "Please input riskword" };
  }
  return { isValid: true, message: null };
};

export const SuggestRequestForm = () => {
  const { createSuggestion } = useSuggestionApi();
  const { risks, networks } = useRiskAndNetworkList();
  const [riskLevel, setRiskLevel] = useState(2);
  const [isCreating, setIsCreating] = useState(false);

  const { showFailure, showSuccess } = useTransactionNotification();
  const [sent, setIsSent] = useState<{ ticketid: number } | null>(null);
  const [showExampleSuggestion, setShowExampleSuggestion] = useState(false);
  const [selectedExmaple, setSelectedExample] = useState(0);
  const [showNetworkSelect, setShowNetworkSelect] = useState(false);
  const { connected, address } = useWeb3Context();

  const auth = useSelector((state: IStoreState) => state.auth);
  const exmapleSuggestions = ExampleSuggestions();
  const { signin } = useSignin();
  const [formState, setFormState] = useState(INITIAL_STATE);

  const handleChange =
    <K extends keyof typeof INITIAL_STATE>(key: K) =>
    (e: { target: { value: string | File } }) => {
      const value = e.target.value;
      setFormState((old) => ({ ...old, [key]: value }));
    };
  const onClose = () => {
    setIsSent(null);
  };

  const handleCreate = async () => {
    const validationResp = validate(formState);
    if (!validationResp.isValid) {
      showFailure(validationResp.message);
      return;
    }

    let _suggestion = { ...formState };
    _suggestion.risk = riskLevel;
    setIsCreating(true);
    try {
      await createSuggestion(_suggestion);
      setFormState(INITIAL_STATE);
      showSuccess("Suggestion Saved For Review");
    } catch (e) {
      console.log(e);
      showFailure("Please Try Again Later");
    } finally {
      setIsCreating(false);
    }
  };

  const changeNetwork = (network: number) => {
    setFormState((old) => ({ ...old, network }));
  };

  const prevExample = () => {
    if (selectedExmaple > 0) setSelectedExample(selectedExmaple - 1);
  };
  const nextExample = () => {
    if (selectedExmaple < exmapleSuggestions.length - 1)
      setSelectedExample(selectedExmaple + 1);
  };

  const DropDownMenu = () => {
    return (
      <ClickAwayListener onClickAway={() => setShowNetworkSelect(false)}>
        <Overlay
          onClick={() => {
            setShowNetworkSelect(false);
          }}
        >
          <DropDown>
            <div id="collapseExample" className="collapse">
              {networks.map((item: any) => (
                <DropDownItem
                  key={item.chainId}
                  className={clsx(
                    "d-flex justify-content-between align-items-center",
                    { selected: item.strapiId === formState.network }
                  )}
                  onClick={() => changeNetwork(item.strapiId)}
                >
                  <div>{item.name}</div>
                </DropDownItem>
              ))}
            </div>
          </DropDown>
        </Overlay>
      </ClickAwayListener>
    );
  };
  const { holdingDons, refetch } = useStakingContract();
  const [hasCheckedDons, setHasChecked] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  useEffectOnTabFocus(() => {
    (async () => {
      setHasChecked(false);
      try {
        await refetch();
      } catch (e) {
        captureException(e, "UseEffect Accelerated APY Modal");
      } finally {
        setHasChecked(true);
      }
    })();
  }, [address]);
  const handleSignInAndSubmit = async () => {
    try {
      setIsCreating(true);
      if (!connected) {
        setShowSignInPopup(true);
      }
      await signin();
    } catch (e) {
    } finally {
      setIsCreating(false);
    }
  };
  const hasDons = hasCheckedDons && holdingDons && holdingDons.gte(100);

  const renderSubmitButton = () => {
    if (!hasCheckedDons) {
      return (
        <SuggestRequestButton disabled>
          Submit Suggestion
        </SuggestRequestButton>
      );
    }
    if(!hasDons){
      return <SuggestRequestButton disabled>
        You need at Least 100 DON in Order Submit Suggestion
      </SuggestRequestButton>
    }

    if (!connected || !auth.token) {
      return (
        <SuggestRequestButton onClick={handleSignInAndSubmit}>
          {isCreating ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <> Sign In &amp; Submit</>
          )}
        </SuggestRequestButton>
      );
    }

    return (
      <SuggestRequestButton onClick={handleCreate}>
        {isCreating ? (
          <Spinner animation="border" size="sm" />
        ) : (
          "Submit Suggestion"
        )}
      </SuggestRequestButton>
    );
  };

  return (
    <Form>
      <Label>
        Nick Name
        <br />
        <Input
          value={formState.nickName}
          onChange={handleChange("nickName")}
          placeholder="Livia"
        />
      </Label>
      <Label>
        Telegram Name
        <br />
        <SmallSpan>
          So we can contact you once the suggestion is applied
        </SmallSpan>
        <Input
          value={formState.telegram}
          onChange={handleChange("telegram")}
          placeholder="@Livia_siphron"
        />
      </Label>
      <Label>
        Strategy Name
        <Input
          value={formState.title}
          onChange={handleChange("title")}
          placeholder="Start write here"
        />
      </Label>
      {sent && (
        <SuccessOverlay ticketid={sent.ticketid} isOpen onClose={onClose} />
      )}
      <Label>
        Network
        <div className="d-flex position-relative">
          <DropdownBtn
            active={showNetworkSelect}
            onClick={() => setShowNetworkSelect(true)}
            aria-controls="collapseExample"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
          >
            {
              networks.find((item: any) => formState.network === item.strapiId)
                .name
            }
            <AiFillCaretDown className="icon" />
          </DropdownBtn>
          {showNetworkSelect && <DropDownMenu />}
        </div>
      </Label>
      <Label>
        Estimated APY
        <div style={{ position: "relative" }}>
          <Input
            value={formState.apy}
            onChange={handleChange("apy")}
            placeholder="12.24"
          />
          <APYPercent>%</APYPercent>
        </div>
      </Label>

      <Label>Risk Level</Label>
      <div>
        <div style={{ display: "flex" }}>
          <RiskLevel
            color="#00BFFF"
            style={{ borderRadius: "10px  0 0 10px" }}
            onClick={() => setRiskLevel(3)}
          >
            {riskLevel === 3 && renderRiskLevelSelector(risks, 3)}
          </RiskLevel>
          <RiskLevel color="#32CD32" onClick={() => setRiskLevel(5)}>
            {riskLevel === 5 && renderRiskLevelSelector(risks, 5)}
          </RiskLevel>
          <RiskLevel color="#FFD700" onClick={() => setRiskLevel(2)}>
            {riskLevel === 2 && renderRiskLevelSelector(risks, 2)}
          </RiskLevel>
          <RiskLevel color="orange" onClick={() => setRiskLevel(6)}>
            {riskLevel === 6 && renderRiskLevelSelector(risks, 6)}
          </RiskLevel>
          <RiskLevel
            color="#FF4500"
            style={{ borderRadius: "0 10px 10px 0" }}
            onClick={() => setRiskLevel(1)}
          >
            {riskLevel === 1 && renderRiskLevelSelector(risks, 1)}
          </RiskLevel>
        </div>
      </div>

      <Label>
        Describe the risk in your words
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltipFees}
        >
          <BsQuestionCircle style={{ marginLeft: "5px" }} />
        </OverlayTrigger>
        <TextArea
          rows={2}
          value={formState.riskword}
          onChange={handleChange("riskword")}
          placeholder="Start write here"
        ></TextArea>
      </Label>

      <Label>
        Suggestion Flow
        <br />
        <TextArea
          rows={5}
          value={formState.description}
          onChange={handleChange("description")}
          placeholder="Start write here"
        ></TextArea>
      </Label>

      {renderSubmitButton()}

      <div style={{ display: "flex" }}>
        <ShowExampleSuggestionBtn
          onClick={() => setShowExampleSuggestion(true)}
        >
          Click here to see examples how to write a suggestion
        </ShowExampleSuggestionBtn>
      </div>

      <DonCommonmodal
        isOpen={showExampleSuggestion}
        title="Suggestion Examples"
        variant="common"
        onClose={() => setShowExampleSuggestion(false)}
        size="mdSmall"
      >
        <ExampleSuggetionBox>
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ width: "100%" }}>
              <label style={{ fontSize: "0.8rem" }}>Suggestion Name</label>
              <ExampleSuggestionTitle>
                {exmapleSuggestions[selectedExmaple].title}
              </ExampleSuggestionTitle>
            </div>
            <RiskImage
              src={risks[exmapleSuggestions[selectedExmaple].risk].image.url}
            />
          </div>

          <div style={{ display: "flex", width: "100%", margin: "0" }}>
            <div style={{ width: "100%" }}>
              {/* 
              <UserImage src={ExampleUser} alt="user" />
              <label style={{fontSize:'0.8rem', fontWeight: 500}}>{exmapleSuggestions[selectedExmaple].name}</label>
            */}
            </div>
            <ExampleSuggetionAPY>
              <span>{exmapleSuggestions[selectedExmaple].apy}%</span>
              <span style={{ color: "lightgrey", marginLeft: "4px" }}>APY</span>
            </ExampleSuggetionAPY>
          </div>

          <ExampleSuggetionContent>
            <ShowMoreContent
              content={exmapleSuggestions[selectedExmaple].description}
              length={180}
            />
          </ExampleSuggetionContent>
        </ExampleSuggetionBox>

        <ExampleList>
          {exmapleSuggestions.map((example, idx) => (
            <SuggetionImage
              src={ExampleSuggetionImg}
              onClick={() => setSelectedExample(idx)}
              selected={selectedExmaple === idx}
            />
          ))}
        </ExampleList>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: 600,
          }}
        >
          <BsArrowLeft
            style={{ margin: "10px", cursor: "pointer" }}
            onClick={() => prevExample()}
          />
          <span>Select Suggestion</span>
          <BsArrowRight
            style={{ margin: "10px", cursor: "pointer" }}
            onClick={() => nextExample()}
          />
        </div>
      </DonCommonmodal>
      {showSignInPopup && (
        <WalletPopup onClose={() => setShowSignInPopup(false)} />
      )}
    </Form>
  );
};
