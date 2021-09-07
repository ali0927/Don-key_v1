import { ButtonWidget } from "components/Button";
import { DonCommonmodal } from "components/DonModal";
import { getBSCDon, toEther, toWei } from "helpers";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useWeb3 } from "don-components";
import BigNumber from "bignumber.js";
import { useEffectOnTabFocus, useStakingContract } from "hooks";
import { Spinner } from "react-bootstrap";
import { CircularProgress, Slider, withStyles } from "@material-ui/core";
import { theme } from "theme";
import { BuyDonContent } from "components/BuyDonContent/BuyDonContent";
import clsx from "clsx";

const Heading = styled.h2`
  font-weight: bold;
  font-size: ${(props: {fontSize: string}) => props.fontSize};
  color: #070602;
`;

const SubHeading = styled.p`
 font-family: Poppins;
 font-size: 14px;
 font-weight: 500;
 text-align: left;
 color: #A3A3A3;
`;

const TierRoot = styled.div`
   border: 1px solid #ECECEC;
   border-radius: 10px;
   padding: 5px;
   & .tierButton {
       width: 92px;
       height: 37px;
       font-family: Poppins;
       font-size: 12px;
       font-weight: 600;
       color: #000;
       display: flex;
       align-items: center;
       justify-content: center;
       cursor: pointer;

   }
   & .tierSelected {
    background: #FCEB74;
    border: 1px solid #FED700;
    box-shadow: 0px 2px 10px rgba(87, 16, 112, 0.08);
    border-radius: 10px;
    color: #081E3F;
   }
   & .tierDisabled {
      color: #A2A2A2;
   }
`;

const DonInfoRoot = styled.div`
     margin-top: 38px;
`;

const DonAvaliableInput = styled.div`
    height: 62px;
    border: 1px solid #ECECEC;
    border-radius: 10px;
    padding: 20px;
`;

const HrLine = styled.hr`
    
     border: none;
     &:before {
      content: "";
      display: block;
      position: absolute;
      right: 0;
      max-width: 100%;
      width: 100%;
      border-top: 1px solid #ECECEC;
    }
`;


const Header = styled.div``;



export const AcceleratedAPYModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [availableDon, setAvailableDon] = useState("");

  const {
    stakedDon,
    stake,
    getTierInfo,
    getTierList,
    holdingDons,
    coolOffDuration,
    tier,
    refetch,
  } = useStakingContract();
  const [predictedApy, setPredictedApy] = useState("");
  const web3 = useWeb3();
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const tiersList =  getTierList();
  const tiersListLength = Object.keys(tiersList).length;

  const fetchAvailableDon = async () => {
    const accounts = await web3.eth.getAccounts();
    const donContract = await getBSCDon(web3);

    const userBalance = await donContract.methods.balanceOf(accounts[0]).call();
    setAvailableDon(toEther(userBalance));
  };

  const initialTier = tier.tier ? tier.tier+1 : 1;
  const [selectedTier, setSelectedTier] = useState(initialTier);

  useEffect(() => {
    fetchAvailableDon();
  }, []);

  const donAmount = useMemo(() => {
    let currentTier = getTierList()[selectedTier]
    if(getTierList()[selectedTier]){
        const amount = getTierList()[selectedTier].donRequired;
        return amount;
    }
    else {
       currentTier = getTierList()[tier.tier];
       if(currentTier){
          const amount = getTierList()[tier.tier].donRequired;
          return amount;
       }
    }
    return "0";

  }, [selectedTier]);

  

  const updatePredictedApy = async () => {
    setLoading(true);
    try {
      const apyObj = await getTierInfo(donAmount);

      if (apyObj) {
        setPredictedApy(apyObj.apy.toFixed());
      }
    } finally {
      setLoading(false);
    }
  };

  const stakeDon = async () => {
    if(initialTier < tiersListLength){
        setBtnLoading(true);
        try {
           await stake(toWei(new BigNumber(donAmount).minus(stakedDon).toString()));
           onClose();
         } catch (e) {
              console.log(e);
          } finally {
                setBtnLoading(false);
          }
    }
  };

  useEffect(() => {
    updatePredictedApy();
  }, [donAmount]);

  const [hasCheckedDons, setHasChecked] = useState(false);

  useEffectOnTabFocus(() => {
    (async () => {
      setHasChecked(false);
      try {
        await refetch();
      } catch (e) {
      } finally {
        setHasChecked(true);
      }
    })();
  }, []);
  const hasDons = hasCheckedDons && holdingDons && holdingDons.gte(100);



 

  const renderContent = () => {
    if (!hasCheckedDons) {
      return (
        <div
          style={{ minHeight: 200 }}
          className="d-flex justify-content-center align-items-center"
        >
          <CircularProgress color="inherit" />
        </div>
      );
    }
    if (hasDons) {
      return (
        <div style={{ marginTop: -30, marginBottom: -20 }}>
          <Header >
            <Heading fontSize="23px" className="mb-2">Accelerated APY</Heading>
            <SubHeading>Stake DON tokens and get Accelerated APY</SubHeading>
          </Header>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <SubHeading>Your current Tier:</SubHeading>
            <Heading fontSize="27px">Tier {tier.tier }</Heading>
          </div>

          <div className="mt-2">
             <SubHeading>Upgrade Tier</SubHeading>

             <TierRoot className="d-flex ml-0 mr-0">
                {Object.keys(tiersList).map((item,index)=>{
                         const tierItem = tiersList[item];
                         const isSelected =  selectedTier === tierItem.tier;
                         const isTierDisabled = initialTier > tierItem.tier;
                         const isAllDisabled =  initialTier > tiersListLength;
                         if(index !== 0){
                         return(
                      
                            <div className={clsx("tierButton",{ 
                              "tierSelected": (isSelected && !isAllDisabled),
                              "tierDisabled": isTierDisabled,
                            })}
                               onClick={() => {
                                 if(!isTierDisabled && !isAllDisabled){
                                   setSelectedTier(tierItem.tier as number)
                                 }
                               }}   > Tier {tierItem.tier}</div>
                           
                         )
                        }
                        return null;
                         
                })

                }
             </TierRoot>

             <DonInfoRoot>
                 {!hasDons &&
                     <Heading className="text-center mb-5" fontSize="20px">You don’t have DON available 
                     in your wallet</Heading>

                 }
                 {hasDons &&
                 <>
                 <SubHeading>Available DON</SubHeading>
                 <DonAvaliableInput >
                     <Heading className="m-0 text-right" fontSize="25px">{new BigNumber(availableDon).toFixed(2)}</Heading>
                 </DonAvaliableInput>
                 </>
                 }

             </DonInfoRoot>

             <div className="d-flex justify-content-between align-items-center mt-3">
                <SubHeading>Required DON Stake:</SubHeading>
                <Heading fontSize="27px">{donAmount}</Heading>
             </div>

             <div className="d-flex align-items-center justify-content-between ">
                <SubHeading>Extra APY will be</SubHeading>
                <Heading fontSize="20px">+{predictedApy}%</Heading>
             </div>

             <div className="d-flex align-items-center justify-content-center mt-3">
                 <ButtonWidget
                    varaint="contained"
                    onClick={stakeDon}
                    disabled={initialTier >= tiersListLength}
                    className="py-2 font-weight-bold"
                    containedVariantColor="lightYellow"
                    width="205px"
                   height="40px"
              >
                   {btnLoading ? (
                      <Spinner animation="border" size="sm" />
                        ) : (
                         "Lock DON"
                    )}
              </ButtonWidget>
            </div>

                <HrLine className="mt-4 mb-5"/>

                
                   <SubHeading className="m-0">
                     Staked DON tokens will be lcoked for 2 minutes after unstaking.
                    DON rewards are claimable on the go.  <a
                      href="https://don-key-finance.medium.com/accelerated-apy-d31d5accbb51"
                      target="_blank"
                     className="ml-1"
                     style={{color: "#000"}}
              >
                Read more{" "}
              </a>
                    </SubHeading>
               
          </div>

        </div>
      );
    } else {
      return <BuyDonContent />;
    }
  };

  return (
    <DonCommonmodal
      isOpen={open}
      title=""
      variant="common"
      onClose={onClose}
      size="xs"
    >
      {renderContent()}
    </DonCommonmodal>
  );
};


// const DonInput = ({
//   label,
//   placeholder,
//   value,
//   max,
//   showMaxButton,
//   onChange,
// }: {
//   label: string;
//   placeholder?: string;
//   value: string;
//   max?: string;
//   showMaxButton?: boolean;
//   onChange: (e: string) => void;
// }) => {
//   return (
//     <DonInputWrapper>
//       <DonInputLabel>{label}</DonInputLabel>
//       <DonHTMLInput
//         placeholder={placeholder}
//         type="text"
//         readOnly
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       />
//       {max && (
//         <MaxButton className="link-primary" onClick={() => onChange(max)}>
//           Max
//         </MaxButton>
//       )}
//     </DonInputWrapper>
//   );
// };

// const DonSlider = withStyles({
//   root: {
//     color: theme.palette.common.yellow,
//     height: 8,
//   },
//   thumb: {
//     height: 24,
//     width: 24,
//     backgroundColor: "#fff",
//     border: "2px solid currentColor",
//     marginTop: -8,
//     marginLeft: -12,
//     "&:focus, &:hover, &$active": {
//       boxShadow: "inherit",
//     },
//   },
//   mark: {
//     width: 1,
//     height: 5,
//     marginTop: 7,
//     backgroundColor: "#b0b0b0",
//     '&[data-index="4"]': {
//       left: "98% !important",
//     },
//   },
//   markLabel: {
//     '&[data-index="4"]': {
//       left: "97% !important",
//     },
//   },
//   active: {},
//   valueLabel: {
//     left: "calc(-50% + 4px)",
//   },
//   track: {
//     height: 8,
//     borderRadius: 4,
//   },
//   rail: {
//     height: 8,
//     borderRadius: 4,
//   },
// })(Slider);

// const ApyForm = styled.div`
//   margin-top: 4rem;
// `;



// const Info = styled.p`
//   font-size: 12px;
//   line-height: 20px;
//   padding: 0 50px;
//   text-align: center;

//   color: #656565;
// `;
// const MaxButton = styled.span`
//   cursor: pointer;
//   position: absolute;
//   right: 0;
//   bottom: -20px;
//   font-size: 12px;
//   color: #0d6efd;
//   &:hover,
//   &:focus {
//     color: #0a58ca;
//   }
// `;
// const DonInputWrapper = styled.div`
//   border: 1px solid #3e3e3e;
//   border-radius: 10px;
//   position: relative;
//   margin-bottom: 40px;
// `;
// const DonInputLabel = styled.label`
//   position: absolute;
//   top: 0;
//   background-color: #fff;
//   padding-left: 5px;
//   padding-right: 5px;
//   left: 0;
//   transform: translate(15px, -60%);
//   font-size: 12px;
//   color: #c6c6c6;
//   margin-bottom: 0%;
// `;
// const DonHTMLInput = styled.input`
//   text-align: left;
//   font-size: 15px;
//   border: none;
//   color: gray;
//   border-radius: 10px;
//   width: 100%;
//   height: 100%;
//   padding: 14px 1rem;
//   &:focus {
//     outline: none;
//   }
// `;



          {/* <ApyForm>
            <DonInput
              label="Available DON"
              value={new BigNumber(availableDon).toFixed(2)}
              placeholder="Amount"
              onChange={() => {}}
            />
            <span>Choose Tier</span>
            <DonSlider
              value={selectedTier * 20}
              onChange={(e, val) => {
                const currentVal = tier.tier * 20;
                const valBn = new BigNumber(val as number);

                console.log("Tier",tier,"--selecedTier",selectedTier,"Value--",val)

                if (valBn.lt(currentVal)) {
                  return setSelectedTier(tier.tier as number);
                } else {
                  if (val > currentVal) {
                    setSelectedTier(Math.round((val as number) / 20));
                  }
                }
              }}
              marks={marks}
              step={20}
              min={0}
              max={100}
            />
            <p className="mb-1 text-center">Your DON Stake:</p>
            <h5 className="text-center">{donAmount}</h5>
            <p className="text-center font-weight-bold px-5">
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : predictedApy !== "0" && predictedApy !== "" ? (
                <>Extra APY Will Be: +{predictedApy}%</>
              ) : (
                <>Minimum 1000 DON's Required To Get Extra APY</>
              )}
            </p>

            <Info>
              Staked DON tokens will be locked for {coolOffDuration} days after
              unstaking. DON rewards are claimable on the go.
              <a
                href="https://don-key-finance.medium.com/accelerated-apy-d31d5accbb51"
                target="_blank"
                className="ml-1"
              >
                Read more{" "}
              </a>
            </Info>
            <div className="d-flex align-items-center">
              <ButtonWidget
                varaint="contained"
                onClick={stakeDon}
                disabled={selectedTier <= tier.tier}
                className="py-2 font-weight-bold"
                containedVariantColor="lightYellow"
                height="40px"
              >
                {btnLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Lock DON"
                )}
              </ButtonWidget>
            </div>
          
          </ApyForm>
         */}