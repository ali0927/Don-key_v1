import clsx from "clsx";
import { navigate } from "gatsby-link";
import { RocketLaunchIcon } from "icons";
import React from "react";
import styled from "styled-components";

const Rocket = styled(RocketLaunchIcon)`
  position: absolute;
  left: 6%;
  bottom: 5%;
`;

const StyleButton = styled.button`
  background: #222222;
  box-shadow: 0px 6px 12px -6px rgba(24, 39, 75, 0.12);
  padding: 1rem 2rem;
  color: #fff;
  font-weight: 500;
  border: 0;
  font-size: 16px;
  border-radius: 10px;
  display: flex;
  justify-content: end;
  align-items: center;
  :hover {
    box-shadow: -4px -2px 16px rgba(195, 200, 205, 0.08),
      4px 4px 18px rgba(0, 0, 0, 0.5);
  }
`;

export const LaunchButton: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = (props) => {
  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <StyleButton
        className={clsx(
          "position-relative d-flex justify-content-end",
          props.className
        )}
        style={{ width: 221, height: 55, ...props.style }}
        onClick={handleDashboard}
      >
        <Rocket />
        LAUNCH APP
      </StyleButton>
    </>
  );
};
