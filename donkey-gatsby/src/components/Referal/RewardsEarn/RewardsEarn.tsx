import React, { useState } from "react";
import { ClickAwayListener, Popper, useMediaQuery } from "@material-ui/core";
import { useRewardsPopoverStyles } from "./styles";
import { Rewards } from "./Rewards";
import { theme } from "theme";
import { RewardsEarnMobilePopup } from ".";
import { AcceleratedAPYModal } from "components/AcceleratedAPYModal";

export const RewardsEarnPopOver: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<
    HTMLButtonElement | HTMLDivElement | null
  >(null);
  const isDesktop = useMediaQuery(theme.mediaQueries.lg.up);

  const classes = useRewardsPopoverStyles();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : (event.currentTarget as any));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div style={{ cursor: "pointer" }} onClick={handleClick}>
        {children}
      </div>
      {isDesktop && (
        <ClickAwayListener mouseEvent="onMouseDown" onClickAway={handleClose}>
          <div>
            <Popper
              id={id}
              open={open}
              anchorEl={anchorEl}
              modifiers={[
                {
                  name: "arrow",
                  enabled: true,
                },
              ]}
              placement="top"
            >
              <div className={classes.content}>
                <Rewards openPopup={() => setIsOpen(true)} />
              </div>
            </Popper>
          </div>
        </ClickAwayListener>
      )}
      {!isDesktop && (
        <RewardsEarnMobilePopup
          openApyPopup={() => setIsOpen(true)}
          open={open}
          onClose={handleClose}
        />
      )}
      {isOpen && (
        <AcceleratedAPYModal open={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};
