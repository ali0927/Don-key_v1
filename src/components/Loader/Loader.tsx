import clsx from "clsx";
import React from "react";
import Lottie from "react-lottie";
import animationData from "./loader.json";

export const Loader = ({ style = {} }: { style?: React.CSSProperties }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Lottie
      width={400}
      style={{ maxWidth: "100%", pointerEvents: "none", ...style }}
      isClickToPauseDisabled
      options={defaultOptions}
    />
  );
};
