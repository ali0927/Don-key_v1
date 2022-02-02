import { useTimer } from "hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const CountDown = ({ date }: { date: number }) => {
  const { hrs, mins, secs, hasEnded } = useTimer(date);

  const dispatch = useDispatch();

  useEffect(() => {
    if(hasEnded){
      
    }
  }, [])

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
