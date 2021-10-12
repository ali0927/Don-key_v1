import moment from "moment";
import { useEffect, useState } from "react";

export const useTimer = (timerEnd: number) => {
  const [days, setDays] = useState(0);
  const [hrs, setHrs] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);

  const update = () => {
    const endTime = moment.unix(timerEnd);
    const duration = moment.duration(endTime.diff(moment()));
    const isEnded = endTime.isBefore(moment());
    setHasEnded(isEnded);
    if (!isEnded) {
      setHrs(duration.hours());
      setMins(duration.minutes());
      setSecs(duration.seconds());
      setDays(duration.days());
    }
  };
  useEffect(() => {
    const interval = setInterval(update, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timerEnd]);

  return {
    hasEnded,
    days,
    hrs,
    mins,
    secs,
  };
};
