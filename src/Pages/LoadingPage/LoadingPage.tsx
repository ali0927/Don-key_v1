import React from "react";
import animation from "images/animation_500_kkczfqhd.gif";
import "./LoadingPage.scss"
export const LoadingPage = () => {
  return (
    <div
      className="loadingpage"
    >
      <img src={animation} alt="Animation" width="400" />
    </div>
  );
};
