import ButtonComponent from "components/Button/Button";
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { IoLogoTwitter } from "react-icons/io";
import comingsoon from "images/comingsoon.svg";
import clsx from "clsx";
const ChartIcon = () => {
  return (
    <svg
      width={196}
      height={89}
      viewBox="0 0 196 89"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={0.2}
        d="M6.26 59.5l-4 3v26h189.5V43l-3 2-11.5 10.5-5.5-6.5-5.5-18.5-4.5-5-5.5 14.5-8 22.5-3.5-3-10.5-19.5h-4l-8.5 26h-3.5l-9-59-4-5.5-6 17-8 28-4-3.5-8-20.5-5-2.5-5 2.5-10 20.5-6 4.5-5 15-2.5 1.5-3-4.5-8-29-4-5-4 2.5-9.5 17-4.5 2.5-6.5 12z"
        fill="url(#prefix__paint0_linear_chart)"
      />
      <circle cx={191.26} cy={44} r={4} fill="#000" />
      <path
        d="M191.502 44.214c-8.026.072-8.924 8.325-14.652 10.665-5.729 2.34-8.12-27.884-14.655-28.887-6.535-1.003-8.839 38.666-14.655 36.597-5.816-2.068-6.253-19.978-13.923-22.896-7.669-2.917-7.015 26.475-13.922 27.3C112.788 67.816 112.904 1 105.773 1c-7.13 0-7.852 45.416-15.388 44.655-7.536-.76-7.686-26.047-15.777-26.047-8.09 0-10.634 22.454-17.747 24.535-7.114 2.08-5.327 25.8-12.64 18.446-7.31-7.353-6.345-35.318-13.189-36.597-6.843-1.279-9.105 16.63-15.003 19.663-5.898 3.034-8.723 17.024-14.527 17.024"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_chart"
          x1={97.01}
          y1={1.5}
          x2={97.01}
          y2={79.5}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#646464" />
          <stop offset={1} stopColor="#646464" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const FarmerCards = (props: any) => {
  return (
    <div className={clsx("farmer-cards mt-4")} style={{ maxWidth: 350 }}>
      <Card className="card-outer justify-content-center text-center">
        <Card.Body>
          <div className="card-inner">
            <img src={props.imgs} className="img-fluid card-inner-img" />{" "}
            <Card.Title className="pl-2 m-0">{props.heading}</Card.Title>
          </div>
          <div className="d-flex justify-content-center pt-5 pb-4">
            <ChartIcon />
          </div>
          <Card.Text className="mt-4 mb-4">
           <b>{props.content}</b>
            <div className="d-flex justify-content-between px-5 mt-3">
              <b>APY: <span className="primary-text"> {props.apy}</span></b> <b>TVL: {props.tvl}</b>
            </div>
          </Card.Text>
          <ButtonComponent
            disabled
            className="position-relative btn  btnYellow"
          >
            <img className="coming-soon" src={comingsoon} />
            FOLLOW
          </ButtonComponent>
        </Card.Body>
      </Card>
    </div>
  );
};
