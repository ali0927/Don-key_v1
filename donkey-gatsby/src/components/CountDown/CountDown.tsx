import { useIsomorphicEffect, useTimer } from "hooks";

export const CountDown = ({
  date,
  onEnd,
}: {
  date: number;
  onEnd?: () => void;
}) => {
  const { hrs, mins, secs, hasEnded } = useTimer(date);

  useIsomorphicEffect(() => {
    if (hasEnded) {
      onEnd && onEnd();
    }
  }, [hasEnded]);
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
