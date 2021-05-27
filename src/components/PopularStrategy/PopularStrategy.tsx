import "./popularstrategy.scss";
import { ShowMoreContent } from "components/ShowmoreContent";
import comingsoon from "images/comingsoon.svg";
import clsx from "clsx";
import styled from "styled-components";
import { OverlayTrigger, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { TwitterIcon } from "components/TwitterIcon";
import { TelegramIcon } from "components/TelegramIcon";
import { ButtonWidget } from "components/Button";

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

const Graph1 = () => {
  return (
    <svg
      width={251}
      height={114}
      viewBox="0 0 251 114"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={0.2}
        d="M7.471 76.216l-5.143 3.857v33.429h243.643v-58.5l-3.857 2.571L238 60l-10.672 11.073-7.071-8.357-7.072-23.786-5.785-6.428L203 40.5l-2.672 10.645-10.286 28.928-4.5-3.857L178 58.5l-5.958-7.355H166.9l-10.929 33.428h-4.5L138 3l-3.243-1.355L132 4l-2 6.5-2.958 13.002-10.285 36-5.143-4.5-10.286-26.358L94.9 25.43l-6.429 3.215-12.857 26.357-7.714 5.785-6.429 19.286-3.214 1.929-3.857-5.786L44.114 38.93l-5.143-6.428-5.143 3.214-12.214 21.857-5.786 3.214-8.357 15.429z"
        fill="url(#prefix__paint0_linear)"
      />
      <circle cx={245.188} cy={56.145} r={5} fill="#000" />
      <path
        d="M245.641 56.561c-10.32.092-11.474 10.704-18.839 13.712-7.365 3.009-10.44-35.85-18.842-37.14-8.402-1.29-11.364 49.713-18.842 47.053-7.478-2.66-8.039-25.687-17.9-29.438-9.861-3.75-9.02 34.04-17.9 35.1C144.437 86.907 144.586 1 135.418 1s-10.095 58.391-19.785 57.414c-9.689-.978-9.882-33.49-20.284-33.49-10.403 0-13.672 28.87-22.819 31.545-9.145 2.675-6.849 33.171-16.25 23.717-9.4-9.454-8.159-45.41-16.957-47.054-8.8-1.644-11.707 21.381-19.29 25.282C12.448 62.314 8.816 80.3 1.354 80.3"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear"
          x1={124.15}
          y1={1.645}
          x2={124.15}
          y2={101.93}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#646464" />
          <stop offset={1} stopColor="#646464" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

const Papper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(251, 251, 251);
  box-shadow: 0px 5px 20px rgba(0, 18, 80, 0.1);
  border-radius: 10px;
  font-size: 13px;
  height: 100%;
  h5 {
    font-weight: 700;
  }
`;

const PapperInner = styled.div`
  padding: 1rem;
  border-radius: 10px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  background-color: #fff;
  height:100%;
`;

const DescriptionContent = styled.p`
  min-height: 36px;
`;

const GraphWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  height: 295px;
`;

const TitleRow = styled.div`
  align-items: flex-start;
  min-height: 94px;
`;

export const PopularStrategy = ({
  graph,
  totalValue = "$200 000.32",
  apy = "+30.30%",
  comingsoon: comingSoonProp = false,
  telegram,
  strategyImage,
  twitter,
  contentTitle = "STRATEGY BTCUSD Feel Free to BYield new",
  title = `Saly Strategies WOW`,
  content = `I expect the price to bounce off the support line and move up towards the levelI expect the price to bounce off the support line and move up towards the levelI expect the price to bounce off the support line and move up towards the level`,
  icon = <StratIcon text="SA" showDot />,
  investers,
  onCardClick,
  onButtonClick,
  showAllContent,
  onShowMoreClick,
  onShowLessClick,
}: {
  graph?: React.ReactNode;
  title?: string;
  totalValue?: string | React.ReactElement;
  contentTitle?: string;
  content?: string;
  strategyImage?: string;
  apy?: string;
  telegram?: string | null;
  twitter?: string | null;
  comingsoon?: boolean;
  investers?: number | null;
  icon?: React.ReactElement;
  onCardClick?: () => void;
  onButtonClick?: () => void;
  showAllContent?: boolean;
  onShowMoreClick?: () => void;
  onShowLessClick?: () => void;
}) => {
  // const goToStrategy = () => {
  //   history.push("/strategy");
  // };

  const [show, setShow] = useState(false);

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

  const heading = <h5 className="ml-3 mb-0">{title}</h5>;
  return (
    <Papper>
      <PapperInner>
        <Container>
          <TitleRow className="row">
            <Col
              sm={12}
              onClick={handleCardClick}
              className={clsx("popularstrategy__title ", {
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
            {/* <Col sm={3}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: 5,
                }}
              >
                {telegram && (
                  <TelegramIcon
                    fill={"#000"}
                    handle={telegram}
                    height={20}
                    width={20}
                  ></TelegramIcon>
                )}
                {twitter && (
                  <TwitterIcon
                    fill={"#000"}
                    handle={twitter}
                    height={20}
                    width={20}
                  ></TwitterIcon>
                )}
              </div>
            </Col> */}
          </TitleRow>
        </Container>

        {/* <div
          onClick={handleCardClick}
          className={clsx("popularstrategy__title ", {
            "cursor-pointer": !comingSoonProp,
          })}
        >
          {icon}
          {investers ? (
            <div>
              {heading}
              <small style={{ fontSize: 14 }} className="ml-3">
                <span className="font-weight-bold">{investers}</span> investors
              </small>
            </div>
          ) : (
            heading
          )}
        </div> */}
        <GraphWrapper>
          {graph ? (
            graph
          ) : (
            <OverlayTrigger
              placement="top"
              key="top"
              overlay={
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <img
                    src={strategyImage}
                    className="imageToShow"
                    alt="graph"
                    width="45%"
                    style={{
                      background: "white",
                      maxWidth: "1300px",
                      padding: 20,
                      margin: "0 auto",
                      borderRadius: 10,
                      boxShadow:
                        "4.01577px 8.05442px 118px rgba(0, 0, 0, 0.05), 2.60281px 5.22045px 69.1065px rgba(0, 0, 0, 0.037963), 1.54681px 3.10244px 37.5852px rgba(0, 0, 0, 0.0303704), 0.803153px 1.61088px 19.175px rgba(0, 0, 0, 0.025), 0.327211px 0.656286px 9.61481px rgba(0, 0, 0, 0.0196296), 0.0743661px 0.149156px 4.64352px rgba(0, 0, 0, 0.012037)",
                    }}
                  />
                </div>
              }
            >
              <div>
                <img src={strategyImage} className="imageToShow" alt="graph" />
              </div>
            </OverlayTrigger>
          )}
        </GraphWrapper>
      </PapperInner>

      <div className="popularstrategy__content">
        <div className="popularstrategy__content__info">
          <div>
            <p className="mb-0">Total Value</p>
            <h5>{totalValue}</h5>
          </div>
          <div className="text-right">
            <p className="mb-0">APY</p>
            <h5 className="primary-text">{apy}</h5>
          </div>
        </div>
        <h5 className="mt-4 popularstrategy__content__title">{contentTitle}</h5>
       <div className="d-flex flex-column justify-content-between h-100">
        <DescriptionContent className="popularstrategy__content__text">
          <ShowMoreContent content={content} showAllContent={showAllContent} onShowMoreClick={onShowMoreClick} onShowLessClick={onShowLessClick} length={100} />
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
    </Papper>
  );
};
