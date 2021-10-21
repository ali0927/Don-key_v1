import Lottie from "react-lottie";

import animationData from "./rocket.json";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export const RocketAnimation = () => {
  return (
    <Lottie
      style={{ width:'100%', height: 55,  pointerEvents: "none", }}
       speed={0.2}
      isClickToPauseDisabled
      options={defaultOptions}
    />
  );
};
