import clsx from "clsx";
import { ITier } from "components/StakingContractProvider";
import styled from "styled-components";
import { tierImages } from "./tierImages";

const TierHeading = styled.h5`
  font-size: 20px;
  font-weight: 800;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const StyledSmall = styled.small`
  font-size: 12px;
  font-weight: 400;
  margin-left: 8px;
  @media (max-width: 768px) {
    font-size: 8px;
    margin: 0;
    text-decoration: underline;
  }
`;

const TierText = styled.p`
  margin: 0;
  font-size: 10px !important;
  font-weight: 600;
`;

const ImageWrapper = styled.div`
  width: 54px;
  opacity: 0.5;
  &.active {
    transform: scale(1.5);
    opacity: 1;
    width: 120px;
  }
`;

const StyledImage = styled.img`
  max-width: 100%;
  object-fit: fill;
  height: 62px;
`;

export const TierInfo = ({
  tier,
  onClick,
}: {
  tier: ITier;
  onClick: () => void;
}) => {
  return (
    <div className="pt-3 pb-5 py-lg-4">
      <div className="mt-1">
        {/* Title */}
        <TierHeading>
          <span className="cursor-pointer" onClick={onClick}>
            {" "}
            Upgrade Tier{" "}
          </span>
          <br className="d-md-none" />{" "}
          <StyledSmall
            className="cursor-pointer"
            onClick={() => {
              window.open(
                "https://don-key-finance.medium.com/introducing-don-key-accelerated-rewards-b27f629cb33b",
                "_blank"
              );
            }}
          >
            Learn more
          </StyledSmall>
        </TierHeading>
      </div>
      <div className=" mt-5">
        <div className="d-flex" style={{ marginLeft: -20 }}>
          {tierImages.map((image, i) => {
            const num = i ;
            return (
              <ImageWrapper
                className={clsx(
                  " d-flex flex-column align-items-center",
                  {
                    active: num === tier.tier,
                    "d-flex": num === tier.tier,
                  }
                )}
              >
                <StyledImage alt={`tier ${num}`} src={image} />
                <TierText>Tier {num}</TierText>
              </ImageWrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
};
