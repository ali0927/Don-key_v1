import moment from "moment";
import { useEffect, useState } from "react";

export const useTimer = (timerEnd?: number | string, isUtc?: boolean) => {
  const [days, setDays] = useState(0);
  const [hrs, setHrs] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [duration, setDuration] = useState<string>("");
  const update = () => {
    let endTime = moment.utc();
    if (isUtc) {
      endTime = moment.utc(timerEnd).local();
    } else {
      endTime = moment.unix(timerEnd as number);
    }

    const duration = moment.duration(endTime.diff(moment()));
    const isEnded = endTime.isBefore(moment());
    setHasEnded(isEnded);
    if (!isEnded) {
      setHrs(duration.hours());
      setMins(duration.minutes());
      setSecs(duration.seconds());
      setDays(duration.days());
      setDuration(duration.humanize());
    }
  };
  useEffect(() => {
    if (timerEnd) {
      const interval = setInterval(update, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [timerEnd]);

  return {
    hasEnded,
    days,
    hrs,
    mins,
    secs,
    duration,
  };
};
