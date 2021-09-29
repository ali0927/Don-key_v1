import Lottie from "react-lottie";

import animationData from "./animation.json";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export default function LottieImage() {
  return (
    <Lottie
      style={{ maxWidth: "100%", pointerEvents: "none" }}
      isClickToPauseDisabled
      options={defaultOptions}
    />
  );
}
