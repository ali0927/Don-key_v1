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
export default function RocketAnimation() {
  return (
    <Lottie
      style={{ maxWidth: "100%", pointerEvents: "none", height:50}}
      speed={0.1}
      isClickToPauseDisabled
      options={defaultOptions}
    />
  );
}
