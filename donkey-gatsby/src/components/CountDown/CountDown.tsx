import { useTimer } from "hooks";

export const CountDown = ({ date }: { date: string }) => {
  const { hrs, mins, secs } = useTimer(date, true);
  return (
    <div className="countdowner">
      <div className="hours">
        <div className="data">{hrs}</div>
        <div className="title">hours</div>
      </div>
      <span className="dots">.</span>
      <div className="minutes">
        <div className="data">{mins}</div>
        <div className="title">minutes</div>
      </div>
      <span className="dots">.</span>
      <div className="seconds">
        <div className="data">{secs}</div>
        <div className="title">seconds</div>
      </div>
    </div>
  );
};
