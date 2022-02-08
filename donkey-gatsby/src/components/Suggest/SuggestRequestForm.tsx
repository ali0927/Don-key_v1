import { useTransactionNotification } from "components/LotteryForm/useTransactionNotification";
import React, { useRef, useState, useMemo } from "react";
import { Spinner, OverlayTrigger, Tooltip } from "react-bootstrap";
import styled, { css } from "styled-components";
import { SuccessOverlay } from "./SuccessOverlay";
import coolicon from "./coolicon.svg";
import { useRiskList, useNetworkList } from "components/Suggest";
import { BsTriangleFill, BsArrowRight, BsArrowLeft, BsQuestionCircle } from "react-icons/bs";
import { DonCommonmodal } from "components/DonModal";
import { ShowMoreContent } from "components/ShowmoreContent";
import { checkBalanceForStrategy } from "helpers";
import { useStakingContract } from "hooks";
import { useWeb3Context } from "don-components";
import { theme } from "theme";
import { ClickAwayListener } from "@material-ui/core";
import clsx from "clsx";
import { useSuggestionApi } from "hooks";
import { AiFillCaretDown } from "react-icons/ai";
import ExampleSuggetionImg from "../../images/exmaple-suggestion.png";
import ExampleUser from "../../images/ex-user.png";

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
const CheckBeforeSend = styled.div`
background-color: #fff037;
border: 2px dashed #222222;
border-radius: 15px;
padding: 22px 27px;
margin-bottom: 70px;
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
`;
const DefaultOption = { name: "Select an option", value: "" } as const;

const NetworkTypes = [
  { name: "Binance Smart Chain", value: 56, strapiId: 1 },
  { name: "Matic Network", value: 137, strapiId: 3 },
  { name: "Avalanche", value: 43114, strapiId: 6 }
] as const;

const INITIAL_STATE = {
  title: "",
  description: "",
  nickName: "",
  telegram: "",
  address: "",
  network: 0,
  apy: 10,
  riskword: "",
  risk: 0
};
export type ISuggestFormState = typeof INITIAL_STATE;

//@ts-ignore
const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const SmallSpan = styled.span`
  font-size: 12px;
  color: #767b86;
  font-weight: normal;
`;
const APYPercent = styled.label`
  position: absolute;
  right: 10px;
  top: 28px;
`
const RiskLevel = styled.div`
  background: ${(props: { color: string }) => props.color};
  width: 20%;
  height: 15px;
  margin: 2px;
  margin-bottom: 60px;
  cursor: pointer;
`
const RiskLevelSelector = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
  align-items: ${(props: { level: number }) => props.level === 0 ? 'flex-end': props.level === 1 ? 'center': 'flex-start'};
`
const RiskLevelSelectorIcon = styled(BsTriangleFill)`
  color: ${(props: { level: number }) => props.level === 0 ? '#FF4500': props.level === 1 ? '#32CD32': props.level === 2 ? 'orange': props.level === 3 ? '#FFD700': '#00BFFF'};
`
const ShowExampleSuggestionBtn = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  font-size: 0.8rem;
  margin: 10px auto;
`
const ExampleSuggetionBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 20px;
  background: #FBFBFB;
`
const RiskImage = styled.img`
  width: 100px;
  @media (max-width: 568px) {
    display: none;
  }
`
const SuggetionImage = styled.img`
  width: 60px;
  height: 60px;
  over-flow: hidden;
  border-radius: 10px;
  margin: 10px 6px;
  cursor: pointer;
  border: ${(props: { selected: boolean }) => props.selected ? '1px solid orange': 'none'}
`
const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`
const ExampleSuggestionTitle = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
`
const ExampleSuggetionContent = styled.div`
  font-size: 1rem;
  overflow-wrap: anywhere;
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`
const ExampleList = styled.div`
  display: flex;
  overflow-x: auto;
  justify-content: center;
  @media (max-width: 600px) {
    justify-content: normal;
  }
`
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
`

const generateRandomText = (length: number) => {
  const characters = ' abcdefghijklm nopqrstuvwxyz ';
  let result = ' ';
  const charactersLength = characters.length;
  for(let i = 0; i < length; i++) {
      result += 
      characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result
}

const renderTooltipFees = (props: any) => (
  <Tooltip id="button-tooltip" {...props} className="mytooltip">
    <strong>
      Please address the risks in terms of: Impermanent loss, platform risk, audits and TVL in the pools
    </strong>
  </Tooltip>
);

const renderRiskLevelSelector = (risks: any, riskLevel: number) => {
  return (
    <div style={{display:'flex', flexDirection:'column', marginTop: '16px', alignItems:'center'}}>
      <RiskLevelSelectorIcon level={riskLevel} />
      <label style={{textAlign: 'center'}}>{risks[riskLevel].Title}</label> 
    </div>
  )
}

const ExampleSuggestions = (): Array<any> => {
  let _example = new Array(5).fill(0).map(item => {
    return {
      title: generateRandomText(15),
      apy: 12.123,
      name: generateRandomText(10),
      description: generateRandomText(300),
      risk: Math.floor(Math.random() * 3),
      date: '15 Jan 2022 15:30',
      category: 'Payments'
    }
  })  
  return _example
}


export const SuggestRequestForm = () => {
  const { createSuggestion } = useSuggestionApi();
  const riskImages = useRiskList();
  // const networkList = useNetworkList();
  // console.log('networkList---------', networkList)
  const [riskLevel, setRiskLevel] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { showFailure } = useTransactionNotification();
  const [sent, setIsSent] = useState<{ ticketid: number } | null>(null);
  const [showExampleSuggestion, setShowExampleSuggestion] = useState(false);
  const [selectedExmaple, setSelectedExample] = useState(0);
  const [showNetworkSelect, setShowNetworkSelect] = useState(false);
  const { getConnectedWeb3 } = useWeb3Context();

  const exmapleSuggestions = ExampleSuggestions();

  const { tier } = useStakingContract();  
  const checkBalance = async () => {
    const web3 = getConnectedWeb3();
    const _res = await checkBalanceForStrategy(web3);
    if ( _res || tier.tier > 0 ) return true;
    else return false;
  };

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
    const checked = await checkBalance();
    // const checked = true;
    if (checked) {
      let _suggestion = { ...formState };
      _suggestion.network = NetworkTypes[_suggestion.network].strapiId;
      _suggestion.risk = riskImages[_suggestion.risk].strapiId;
      const web3 =  getConnectedWeb3();
      const accounts = await web3.eth.getAccounts();
      _suggestion.address = accounts[0];
      try {
        const resp = await createSuggestion(_suggestion);
        setFormState(INITIAL_STATE);
      } catch (e) {
        console.log(e);
        showFailure("Please Try Again Later");
      } finally {
      }
    }
  };

  const changeNetwork = (network: any) => {
    setFormState((old) => ({ ...old, network: network }));
  }

  const prevExample = () => {
    if (selectedExmaple > 0) setSelectedExample(selectedExmaple - 1)
  }
  const nextExample = () => {
    if (selectedExmaple < exmapleSuggestions.length - 1) setSelectedExample(selectedExmaple + 1)
  }

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
              {NetworkTypes.map((item, idx) => 
                <DropDownItem
                  key={item.value}
                  className={clsx(
                    "d-flex justify-content-between align-items-center",
                    { selected: item.value === formState.network }
                  )}
                  onClick={() => changeNetwork(idx)}
                >
                  <div>{item.name}</div>
                </DropDownItem>
              )}
            </div>
          </DropDown>
        </Overlay>
      </ClickAwayListener>
    );
  };

  return (
    <Form>
       <Label>
        Nick Name<br />
        <Input
          value={formState.nickName}
          onChange={handleChange("nickName")}
          placeholder="Livia"
        />
      </Label>
      <Label>
        Telegram Name<br />
        <SmallSpan>So we can contact you once the suggestion is applied</SmallSpan>
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
      {sent && <SuccessOverlay ticketid={sent.ticketid} isOpen onClose={onClose} />}
      <Label>
        Network
        <div className="d-flex position-relative">
          <DropdownBtn active={showNetworkSelect} onClick={() => setShowNetworkSelect(true)} aria-controls="collapseExample" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false">
            {NetworkTypes[formState.network].name}
            <AiFillCaretDown className="icon" />
          </DropdownBtn>
          {showNetworkSelect && <DropDownMenu />}
        </div>
      </Label>
      <Label>
        Estimated APY
        <div style={{position: 'relative'}}>
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
        <div style={{display:'flex'}}>
          <RiskLevel color="#00BFFF" style={{borderRadius:'10px  0 0 10px'}} onClick={() => setRiskLevel(4)}>
            { riskLevel === 4 && renderRiskLevelSelector(riskImages, 4) }
          </RiskLevel>
          <RiskLevel color="#32CD32" onClick={() => setRiskLevel(1)}>
            { riskLevel === 1 && renderRiskLevelSelector(riskImages, 1) }
          </RiskLevel>
          <RiskLevel color="#FFD700" onClick={() => setRiskLevel(3)}>
            { riskLevel === 3 && renderRiskLevelSelector(riskImages, 3) }
          </RiskLevel>
          <RiskLevel color="orange"  onClick={() => setRiskLevel(2)}>
          { riskLevel === 2 && renderRiskLevelSelector(riskImages, 2) }  
          </RiskLevel>
          <RiskLevel color="#FF4500" style={{borderRadius:'0 10px 10px 0'}} onClick={() => setRiskLevel(0)}>
            { riskLevel === 0 && renderRiskLevelSelector(riskImages, 0) }
          </RiskLevel>
        </div>
      </div>
   
      <Label>
        Describe the risk in your words
        <OverlayTrigger
          placement="top"
          delay={{show: 250, hide: 400}}
          overlay={renderTooltipFees}
        >
          <BsQuestionCircle style={{marginLeft: '5px'}}/>
        </OverlayTrigger>
        <TextArea
          rows={2}
          value={formState.riskword}
          onChange={handleChange("riskword")}
          placeholder="Start write here"
        ></TextArea>
      </Label>

      <Label>
        Suggestion Flow<br />
        <TextArea
          rows={5}
          value={formState.description}
          onChange={handleChange("description")}
          placeholder="Start write here"
        ></TextArea>
      </Label>

      <SuggestRequestButton onClick={handleCreate}>
        {isCreating ? <Spinner animation="border" size="sm" /> : "Submit Suggestion"}
      </SuggestRequestButton>

      <div style={{display: 'flex'}}>
        <ShowExampleSuggestionBtn onClick={() => setShowExampleSuggestion(true)}>
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
          <div style={{display:'flex', width:'100%'}}>
            <div style={{width:'100%'}}>
              <label style={{fontSize:'0.8rem'}}>Suggestion Name</label>
              <ExampleSuggestionTitle>{exmapleSuggestions[selectedExmaple].title}</ExampleSuggestionTitle>
            </div>
            <RiskImage src={riskImages[exmapleSuggestions[selectedExmaple].risk].image.url} />
          </div>

          <div style={{display:'flex', width:'100%', margin:'0'}}>
            <div style={{width:'100%'}}>
            {/* 
              <UserImage src={ExampleUser} alt="user" />
              <label style={{fontSize:'0.8rem', fontWeight: 500}}>{exmapleSuggestions[selectedExmaple].name}</label>
            */}
            </div>
            <ExampleSuggetionAPY>
              <span>{exmapleSuggestions[selectedExmaple].apy}%</span>
              <span style={{color: 'lightgrey', marginLeft:'4px'}}>APY</span>
            </ExampleSuggetionAPY>
          </div>

          <ExampleSuggetionContent>
            <ShowMoreContent content={exmapleSuggestions[selectedExmaple].description} length={180} />
          </ExampleSuggetionContent>
        </ExampleSuggetionBox>

        <ExampleList>
          {exmapleSuggestions.map((example, idx) => 
            <SuggetionImage src={ExampleSuggetionImg} onClick={() => setSelectedExample(idx)} selected={selectedExmaple === idx}/>
          )}
        </ExampleList>
        
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', fontWeight:600}}>
          <BsArrowLeft style={{margin: '10px', cursor:'pointer'}} onClick={() => prevExample()}/>
          <span>Select Suggestion</span>
          <BsArrowRight style={{margin: '10px', cursor:'pointer'}} onClick={() => nextExample()}/>
        </div>
      </DonCommonmodal>

    </Form>
  );
};
