import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FiInfo } from "react-icons/fi";

export const TableHeadingToolTip: React.FC<{ label: string; message: string, position: 'left' | 'right' }> = (
  props
) => {
    const {message, position} = props;
  const renderTooltipFees = (props: any) => (
    <Tooltip id="button-tooltip" {...props}  className="mytooltip">
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
        {props.label}
        <OverlayTrigger
          placement={position}
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltipFees}
        >
          <div
            style={{
              textAlign: "right",
              paddingLeft: 10,
            }}
          >
            <FiInfo />
          </div>
        </OverlayTrigger>
      </div>
    </>
  );
};
