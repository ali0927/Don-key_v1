import clsx from "clsx";
import React from "react";
import styled from "styled-components";
import { breakPoints } from "../../breakponts";
import { ISwitchRowProps } from "./interfaces";
import { Switch } from "../Switch";

export const Heading = styled.div`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: 500;
  font-size: 20px;
  color: #000000;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 42px;
  }
`;

export const SubHeading = styled(Heading)`
  font-size: 14px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 18px;
  }
`;

export const SwitchRow: React.FC<ISwitchRowProps> = (props) => {
  const { heading, subHeading, checked } = props;

  return (
    <div
      className={clsx(
        "d-flex align-items-center justify-content-between",
        props.className
      )}
    >
      <Heading>{heading}</Heading>

      <div className="d-flex align-items-center">
        <SubHeading className="mr-3">{subHeading}</SubHeading>
        <Switch checked={checked} onChange={props.onSwitchChange} />
      </div>
    </div>
  );
};
