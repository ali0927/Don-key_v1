import React, { useMemo, useState } from "react";
import tier1 from "../../../../images/tiersImage/tier1.png";
import tier2 from "../../../../images/tiersImage/tier2.png";
import tier3 from "../../../../images/tiersImage/tier3.png";
import tier4 from "../../../../images/tiersImage/tier4.png";
import tier5 from "../../../../images/tiersImage/tier5.png";
import styled from "styled-components";
import { breakPoints } from "breakponts";
import { CorrectIcon, MobileCorrectIcon } from "icons";
import { ButtonWidget } from "components/Button";
import { useStakingContract } from "hooks";
import { useReferralContext } from "contexts/ReferralContext";
import clsx from "clsx";

const StyledButtonWidget = styled(ButtonWidget)`
  height: 50px;
  font-size: 16px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    height: 40px;
    font-size: 10px;
  }
`;

const SelectedTierRoot = styled.div`
  width: 115px;
  height: 115px;
  border: 3px solid #000000;
  background: #fff037;
  box-shadow: 0px 3.0392px 15.196px rgba(0, 0, 0, 0.1);
  border-radius: 8.62852px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    border: 1px solid #000000;
  }
`;

const StyledCorrectIcon = styled(CorrectIcon)`
  position: absolute;
  top: -20%;
  right: -10px;
`;

const StyledStaticImage = styled.img`
  height: 92px;
  width: 92px;
  object-fit: contain;
  /* @media only screen and (min-width: ${breakPoints.lg}) {
    height: 46px;
    width: 46px;
  } */
`;

const TierBox = styled.div`
  border-radius: 8px;
  background-color: #f2f3f4;
  &.selected {
    background-color: #FFF037;
  }
`;

const Typography = styled.p<{
  lgFontSize: string;
  mdFontSize: string;
  color?: string;
  bold?: boolean;
}>`
  font-family: "Poppins";
  font-size: ${(props) => props.mdFontSize};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  color: ${(props) => (props.color ? props.color : "#000")};
  margin: 0px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: ${(props) => props.lgFontSize};
  }
`;

const TierImage = styled.img`
  height: 56px;
  width: 52px;
  object-fit: contain;
  @media only screen and (min-width: ${breakPoints.lg}) {
    height: 75px;
    width: 80px;
  }
`;

const tiers = [
  { tier: 1, img: tier1 },
  { tier: 2, img: tier2 },
  { tier: 3, img: tier3 },
  { tier: 4, img: tier4 },
  { tier: 5, img: tier5 },
];

export const Rewards = ({ openPopup }: { openPopup: () => void }) => {
  const { tier } = useStakingContract();
  const { getTierCommission } = useReferralContext();
  const index = tiers.findIndex((item) => item.tier === tier.tier);
  const [selectedIndex, setSelectedIndex] = useState(index);
  const tierList = useMemo(() => {
    const newArr = [...tiers];
    if (index > -1) {
      newArr.splice(index, 1);
      return newArr;
    }
    return newArr;
  }, [index]);

  return (
    <>
      <div className="d-flex justify-content-center mt-4 mt-lg-1">
        <SelectedTierRoot className="position-relative d-flex align-items-center justify-content-center">
          <StyledCorrectIcon />

          {selectedIndex > -1 && (
            <StyledStaticImage
              src={tiers[selectedIndex].img}
              alt="Tier image nt found"
            />
          )}
        </SelectedTierRoot>
      </div>
      <div className="row mt-5 mt-lg-3 mb-2 align-item-center">
        <div className="col-7 d-flex align-items-center">
          <Typography color="#9B9B9B" lgFontSize="14px" mdFontSize="14px">
            Tier
          </Typography>
        </div>
        <div className="col-5 text-right">
          <Typography bold lgFontSize="22px" mdFontSize="18px">
            Tier {selectedIndex > -1 ? tiers[selectedIndex].tier : tier.tier}
          </Typography>
        </div>
      </div>

      <div className="d-flex align-item-center justify-content-between">
        <Typography color="#9B9B9B" lgFontSize="14px" mdFontSize="14px">
          Comission from referrals
        </Typography>

        <Typography bold lgFontSize="22px" mdFontSize="18px">
          {getTierCommission(
            selectedIndex > -1 ? tiers[selectedIndex].tier : tier.tier
          )}
          %
        </Typography>
      </div>
      <div className="d-flex justify-content-center py-3">
        <StyledButtonWidget
          className="mt-4 mb-4 mt-lg-3 mb-lg-2"
          varaint="contained"
          width="237px"
          style={{ fontSize: 14 }}
          onClick={openPopup}
        >
          Upgrade your Tier
        </StyledButtonWidget>
      </div>

      <div className="d-flex mt-3 mt-lg-2 mb-3 align-items-center justify-content-between">
        {tierList.map((item, index) => {
          const handleClick = () => {
            const i = tiers.findIndex((it) => it.tier === item.tier);
            if (i > -1) {
              setSelectedIndex(i);
            }
          };
          return (
            <div
              onClick={handleClick}
              style={{ cursor: "pointer" }}
              className=" d-flex flex-column align-items-center"
              key={index}
            >
              <TierBox
                className={clsx(
                  "d-flex align-items-center justify-content-center",
                  { selected: selectedIndex > -1 ? item.tier === tiers[selectedIndex].tier: false }
                )}
              >
                <TierImage src={item.img} alt="Tier image not found" />
              </TierBox>
              <Typography
                className="mt-1 text-center"
                color="#9B9B9B"
                lgFontSize="10px"
                mdFontSize="12px"
              >
                Tier {item.tier}
              </Typography>
            </div>
          );
        })}
      </div>
    </>
  );
};
