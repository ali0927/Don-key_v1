/* eslint-disable  @typescript-eslint/no-unused-vars */
import "./popularstrategy.scss";
import { ShowMoreContent } from "components/ShowmoreContent";
import comingsoon from "images/comingsoon.svg";
import low from "images/low.svg";
import lowmedium from "images/lowmedium.svg";
import medium from "images/medium.svg";
import mediumhigh from "images/mediumhigh.svg";
import high from "images/high.svg";
import disabledImage from "images/disabledImage.svg";
import updatedversion from "images/updatedversion.svg";
import newStrategy from "images/newStrategy.svg";
import clsx from "clsx";
import styled from "styled-components";
import { OverlayTrigger, Container, Col, Tooltip } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import { ButtonWidget } from "components/Button";
import { useIsomorphicEffect } from "hooks/useIsomorphicEffect";
import { IFarmer } from "interfaces";

const StratIcon = ({ text, showDot }: { text: string; showDot?: boolean }) => {
  return (
    <div className="straticon">
      {showDot && <div className="green_dot" />}
      <svg
        width={16}
        height={15}
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="straticon__star"
      >
        <path
          d="M15.483 5.825h0a.32.32 0 01-.1.348h0l-3.49 2.994-.23.198.068.295 1.03 4.435s0 0 0 0 0 0 0 0a.323.323 0 01-.133.338h0a.363.363 0 01-.392.017h-.002l-3.982-2.33L8 11.974l-.252.148-3.984 2.329h0a.361.361 0 01-.393-.017.323.323 0 01-.132-.338L4.27 9.66l.068-.295-.23-.198-3.49-2.994-.002-.001a.32.32 0 01-.099-.346.347.347 0 01.302-.232l4.618-.41.295-.026.12-.272L7.675.706s0 0 0 0A.35.35 0 018 .5c.146 0 .27.084.324.205 0 0 0 0 0 0l1.826 4.181.119.272.295.026 4.618.41h0c.146.013.26.108.301.231z"
          fill="#070602"
          stroke="#FFCA00"
        />
      </svg>
      {text}
    </div>
  );
};

const Papper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: rgb(251, 251, 251);
  box-shadow: 0px 5px 20px rgba(0, 18, 80, 0.1);
  border-radius: 20px;
  font-size: 13px;
  height: 100%;
  h5 {
    font-weight: 700;
  }
`;

const PapperInner = styled.div`
  padding: 1.5rem;
  border-radius: 10px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  background-color: #fff;
  /* height: 100%; */
`;

const DescriptionContent = styled.p`
  min-height: 36px;
`;

const GraphWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 175px;
`;

const TitleRow = styled.div`
  align-items: flex-start;
  min-height: 74px;
`;

const UpdatedVersion = styled.img`
  top: -10px;
  right: 10px;
  position: absolute;
`;

const NewStrategy = styled.img`
  top: -10px;
  right: 10px;
  position: absolute;
`;

const Disabled = styled.img`
  top: -10px;
  right: 10px;
  position: absolute;
`;

const TokenImage = styled.img`
  width: 14px;
  height: 14px;
  margin-left: 6px;
  margin-right: 6px;
`;

export const PopularStrategy = ({
  graph,
  totalValue = "$200 000.32",
  apy = "+30.30%",
  comingsoon: comingSoonProp = false,
  isCardComingsoon = false,
  strategyImage,
  contentTitle = "STRATEGY BTCUSD Feel Free to BYield new",
  title = `Saly Strategies WOW`,
  content = `I expect the price to bounce off the support line and move up towards the levelI expect the price to bounce off the support line and move up towards the levelI expect the price to bounce off the support line and move up towards the level`,
  icon = <StratIcon text="SA" showDot />,
  investers,
  disabled,
  risk,
  riskDescription,
  onCardClick,
  onButtonClick,
  showAllContent,
  farmerId,
  onShowMoreClick,
  onChangeChain,
  network,
  version,
  showOnRight,
  onShowLessClick,
  getTokenImage,
  getTokenSymbol,
  extraApy,
  imageRisk,
}: {
  graph?: React.ReactNode;
  title?: string;
  disabled?: boolean;
  totalValue?: string | React.ReactElement;
  contentTitle?: string;
  content?: string;
  farmerId?: string;
  version?: number;
  strategyImage?: string;
  imageRisk?: string;
  apy?: string;
  telegram?: string | null;
  twitter?: string | null;
  risk?: string | null;
  riskDescription?: string | null;
  comingsoon?: boolean;
  isCardComingsoon?: boolean;
  showOnRight?: boolean;
  getTokenImage?: () => Promise<string>;
  getTokenSymbol?: () => Promise<string>;
  investers?: React.ReactElement | number | null;
  icon?: React.ReactElement;
  network?: IFarmer["network"];
  onChangeChain?: (chainId: number) => void;
  onCardClick?: () => void;
  onButtonClick?: () => void;
  showAllContent?: boolean;
  onShowMoreClick?: () => void;
  onShowLessClick?: () => void;
  extraApy?: string;
}) => {
  const handleCardClick = () => {
    if (!comingSoonProp && onCardClick) {
      onCardClick();
    }
  };

  const ButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };
  const fontSize = useMemo(() => {
    if (title.length < 30) {
      return `1.25rem`;
    } else {
      return `${1.25 * (30 / (title.length + 9))}rem`;
    }
  }, [title]);

  const heading = (
    <h5 style={{ fontSize }} className="ml-3 mb-0">
      {title}
    </h5>
  );

  const [riskImage, setRiskImage] = useState<string | null>(null);
  const [tokenImage, setTokenImage] = useState<string | null>(null);
  const [tokenSymbol, settokenSymbol] = useState<string | null>(null);
  const [riskDescriptionFinal, setRiskDescriptionFinal] = useState<
    string[] | null
  >(null);
  useIsomorphicEffect(() => {
    if (getTokenImage) {
      (async () => {
        const tokenimg = await getTokenImage();
        setTokenImage(tokenimg);
      })();
    }
    if (getTokenSymbol) {
      (async () => {
        const tokenSymbol = await getTokenSymbol();
        settokenSymbol(tokenSymbol);
      })();
    }
  }, [getTokenImage, getTokenSymbol]);

  useEffect(() => {
    if (riskDescription) {
      setRiskDescriptionFinal(riskDescription.split("*"));
    }
  }, [riskDescription]);

  useEffect(() => {
    if (risk) {
      switch (risk) {
        case "low":
          setRiskImage(low);
          break;
        case "lowmedium":
          setRiskImage(lowmedium);
          break;
        case "medium":
          setRiskImage(medium);
          break;
        case "mediumhigh":
          setRiskImage(mediumhigh);
          break;
        case "high":
          setRiskImage(high);
          break;
        default:
      }
    }
  }, [risk]);

  const renderContent = () => {
    return (
      <div className="popularstrategy__content">
        <div className="popularstrategy__content__info">
          <div>
            <p className="mb-0">Total Value</p>
            <h5>{totalValue}</h5>
          </div>

          {riskImage && (
            <div className="text-right" style={{ minHeight: 80 }}>
              {imageRisk ? (
                <div
                  style={{
                    textAlign: "right",
                    paddingLeft: 10,
                  }}
                >
                  <img
                    src={imageRisk}
                    alt="ImageNotFound"
                    style={{ fill: "green", width: 80 }}
                  />
                </div>
              ) : (
                riskImage && (
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id="button-tooltip" className="mytooltip">
                        {riskDescriptionFinal && riskDescriptionFinal[0]} <br />
                        <br />*{riskDescriptionFinal && riskDescriptionFinal[1]}
                      </Tooltip>
                    }
                  >
                    <div
                      style={{
                        textAlign: "right",
                        paddingLeft: 10,
                      }}
                    >
                      <img
                        src={riskImage}
                        alt="ImageNotFound"
                        style={{ fill: "green", width: 80 }}
                      />
                    </div>
                  </OverlayTrigger>
                )
              )}
            </div>
          )}
        </div>
        <div
          className="d-flex justify-content-between"
          // style={riskImage ? { marginTop: -22 } : {}}
        >
          <div className="mb-3">
            {!showOnRight && (
              <>
                {" "}
                <p className="mb-0">APY</p>
                <h5 className="primary-text">{apy}</h5>
              </>
            )}
          </div>
          {extraApy && (
            <div>
              <p className="mb-0 font-weight-bold">APY with DON</p>
              <h5
                style={{ color: "#31c77f" }}
                className="primary-text text-right"
              >
                +{extraApy}
              </h5>
            </div>
          )}
          {showOnRight && (
            <div>
              <p className="mb-0 font-weight-bold text-right">APY</p>
              <h5
                style={{ color: "#31c77f" }}
                className="primary-text text-right"
              >
                {apy}
              </h5>
            </div>
          )}
        </div>
        {tokenImage && (
          <div className="mb-3 mt-2 d-flex align-items-center">
            Deposit in <TokenImage src={tokenImage} />{" "}
            {tokenSymbol && (
              <p className="font-weight-bold mb-0">{tokenSymbol}</p>
            )}
          </div>
        )}
        <h5 className="popularstrategy__content__title">{contentTitle}</h5>
        <div className="d-flex flex-column justify-content-between h-100">
          <DescriptionContent className="popularstrategy__content__text">
            <ShowMoreContent
              content={content}
              showAllContent={showAllContent}
              onShowMoreClick={onShowMoreClick}
              onShowLessClick={onShowLessClick}
              length={100}
            />
          </DescriptionContent>

          <div>
            {comingSoonProp ? (
              <div className="position-relative">
                <ButtonWidget varaint="outlined" height="40px" disabled>
                  Invest
                </ButtonWidget>
                <img
                  className="coming-soon"
                  src={comingsoon}
                  alt="ImageNotFound"
                />
              </div>
            ) : (
              <ButtonWidget
                varaint="outlined"
                height="40px"
                onClick={ButtonClick}
              >
                Invest
              </ButtonWidget>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Papper>
      {isCardComingsoon && (
        <img className="coming-soon" src={comingsoon} alt="ImageNotFound" />
      )}
      <PapperInner>
        {version === 2 ? (
          farmerId === "e3ce43a6-963c-476a-bb3f-c07b7434f911" ||
          farmerId === "e3ce43a6-963c-476a-bb3f-c07b7434f904" ? (
            <UpdatedVersion src={updatedversion} />
          ) : (
            <NewStrategy src={newStrategy} />
          )
        ) : null}
        {disabled && <Disabled src={disabledImage} />}
        <Container className="p-0">
          <TitleRow className="row">
            <Col
              sm={12}
              onClick={handleCardClick}
              className={clsx("d-flex align-items-center", {
                "cursor-pointer": !comingSoonProp,
              })}
            >
              {icon}
              <div>
                {heading}
                <small style={{ fontSize: 14 }} className="ml-3">
                  <span className="font-weight-bold">
                    {investers ? investers : 0}
                  </span>{" "}
                  investors
                </small>
              </div>
            </Col>
          </TitleRow>
        </Container>
        <GraphWrapper>
          {graph ? (
            graph
          ) : (
            <div>
              <img src={strategyImage} className="imageToShow" alt="graph" />
            </div>
          )}
        </GraphWrapper>
      </PapperInner>

      {renderContent()}
    </Papper>
  );
};
