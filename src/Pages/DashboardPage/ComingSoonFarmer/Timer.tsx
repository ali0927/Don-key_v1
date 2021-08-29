import { TimerDots } from "icons";
import * as React from "react";
import styled from "styled-components";

const TimerCard = styled.div`
  display: flex;
  min-width: 66px !important;
  height: 95px;
  align-items: center;
  justify-content: center;
  background: #fff251;
  border-radius: 10px;
  box-shadow: 0px 6px 14px -6px #fff251;
`;

const TimerNumber = styled.p`
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  margin-bottom: 0px;
`;

const TimerLabel = styled.p`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 0;
  text-align: center;
`;

const DotsWrraper = styled.div`
  display: flex;
  justify-content: center;
  width: 4px;
  align-items: center;
  margin-left: 11px;
  margin-right: 11px;
`;

export const Timer: React.FC<{ timerDate: string }> = (props) => {
  // const countDownDate = new Date(props.timerDate).getTime();

  // React.useEffect(() => {
  //   const interval = setInterval(function () {
  //     // Get today's date and time
  //     const now = new Date().getTime();

  //     // Find the distance between now and the count down date
  //     const distance = countDownDate - now;

  //     // Time calculations for days, hours, minutes and seconds
  //     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //     const hours = Math.floor(
  //       (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //     );
  //     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //     const dayElement = document.getElementById("days");
  //     const hoursElement = document.getElementById("hours");
  //     const minElement = document.getElementById("min");
  //     const secElement = document.getElementById("sec");

  //     if (dayElement && hoursElement && minElement && secElement) {
  //       dayElement.innerHTML = days.toString();
  //       hoursElement.innerHTML = hours.toString();
  //       minElement.innerHTML = minutes.toString();
  //       secElement.innerHTML = seconds.toString();
  //       if (distance < 0) {
  //         clearInterval(interval);
  //         dayElement.innerHTML = "0";
  //         hoursElement.innerHTML = "0";
  //         minElement.innerHTML = "0";
  //         secElement.innerHTML = "0";
  //       }
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [countDownDate]);

  return (
    <>
      <TimerCard className="col-lg-1 d-flex align-items-center d-flex align-items-center mt-2 mb-2 w-100 ">
        <div>
          <TimerNumber id="days">0</TimerNumber>
          <TimerLabel>DAYS</TimerLabel>
        </div>
      </TimerCard>

      <DotsWrraper>
        <TimerDots />
      </DotsWrraper>

      <TimerCard className="col-lg-1 d-flex align-items-center mt-2 mb-2  w-100">
        <div>
          <TimerNumber id="hours">3</TimerNumber>
          <TimerLabel>HOURS</TimerLabel>
        </div>
      </TimerCard>

      <DotsWrraper>
        <TimerDots />
      </DotsWrraper>

      <TimerCard className="col-lg-1 d-flex align-items-center mt-2 mb-2  w-100">
        <div>
          <TimerNumber id="min">35</TimerNumber>
          <TimerLabel>MINUTES</TimerLabel>
        </div>
      </TimerCard>

      <DotsWrraper>
        <TimerDots />
      </DotsWrraper>

      <TimerCard className="col-lg-1 d-flex align-items-center mt-2 mb-2  w-100">
        <div>
          <TimerNumber id="sec">37</TimerNumber>
          <TimerLabel>SECONDS</TimerLabel>
        </div>
      </TimerCard>
    </>
  );
};
