import clsx from "clsx";
import { GrayInfoIcon } from "icons";
import { Title } from "pages/dashboard/referrals";
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styled from "styled-components";



export const HeadingToolTip: React.FC<{
  label: string;
  message: string;
  iconClassName?: string;
}> = (props) => {
  const { message } = props;
  const renderTooltipFees = (props: any) => (
    <Tooltip id="button-tooltip" {...props} className="mytooltip">
      <React.Fragment>
        <p>{message}</p>
      </React.Fragment>
    </Tooltip>
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
        }}
      >
        <Title  variant="light" >{props.label}</Title>
        <OverlayTrigger
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltipFees}
        >
          <div
            className={clsx(props.iconClassName,"ml-1")}
            style={{
              textAlign: "right",
            }}
          >
            <GrayInfoIcon />
          </div>
        </OverlayTrigger>
      </div>
    </>
  );
};
