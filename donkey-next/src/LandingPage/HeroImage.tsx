import React from "react";
import Lottie from "react-lottie";
import animationData from "./animation.json";

export const HeroImage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie  style={{maxWidth: "100%", pointerEvents: 'none'}} isClickToPauseDisabled options={defaultOptions} />;
};
