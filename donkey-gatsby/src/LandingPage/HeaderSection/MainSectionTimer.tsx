import React, { useState } from "react";
import styled from "styled-components";
import { breakPoints } from "breakponts";
import { TimerDots, MainSectionSmallDots } from "icons";
import { useTimer } from "hooks";
import moment from "moment";

const TimerCard = styled.div`
  height: 72px;
  width: 65px;
  border-radius: 6px;
  background: #fff251;
  box-shadow: 0px 3.72414px 8.68966px -3.72414px #d1c74c;
  @media only screen and (min-width: ${breakPoints.md}) {
    height: 130px;
    width: 117px;
    border-radius: 11px;
    box-shadow: 0px 6.73333px 15.7111px -6.73333px #d1c74c;
  }
`;

const Typography = styled.p<{
  mdFontSize: string;
  smFontSize: string;
  color: string;
  bold?: boolean;
}>`
  font-family: "Poppins";
  margin: 0px;
  font-size: ${(props) => props.smFontSize};
  color: ${(props) => props.color};
  font-weight: ${(props) => (props.bold ? "800" : "400")};
  @media only screen and (min-width: ${breakPoints.md}) {
    font-size: ${(props) => props.mdFontSize};
  }
`;




export const MainSectionTimer: React.FC = () => {
  const { days, hrs, mins, secs } = useTimer("Wednesday, 17 November 2021",true);
  const renderDots = React.useMemo(() => {
    return (
      <div className="d-flex align-items-center ml-2 mr-2">
        <TimerDots className="d-none d-lg-block" />
        <MainSectionSmallDots className="d-block d-lg-none" />
      </div>
    );
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between mb-3 mb-lg-5">
        <TimerCard className="d-flex flex-column justify-content-center align-items-center">
          <Typography mdFontSize="50px" smFontSize="26px" color="#222222">
            {days}
          </Typography>
          <Typography mdFontSize="16px" smFontSize="9px" color="#222222">
            DAYS
          </Typography>
        </TimerCard>
        {renderDots}
        <TimerCard className="d-flex flex-column justify-content-center align-items-center">
          <Typography mdFontSize="50px" smFontSize="26px" color="#222222">
            {hrs}
          </Typography>
          <Typography mdFontSize="16px" smFontSize="9px" color="#222222">
            HOURS
          </Typography>
        </TimerCard>
        {renderDots}
        <TimerCard className="d-flex flex-column justify-content-center align-items-center">
          <Typography mdFontSize="50px" smFontSize="36px" color="#222222">
            {mins}
          </Typography>
          <Typography mdFontSize="16px" smFontSize="9px" color="#222222">
            MINUTES
          </Typography>
        </TimerCard>
        {renderDots}
        <TimerCard className="d-flex flex-column justify-content-center align-items-center">
          <Typography mdFontSize="50px" smFontSize="26px" color="#222222">
            {secs}
          </Typography>
          <Typography mdFontSize="16px" smFontSize="9px" color="#222222">
            SECONDS
          </Typography>
        </TimerCard>
      </div>
    </>
  );
};
