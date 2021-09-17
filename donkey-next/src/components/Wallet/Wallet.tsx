import React from "react";
import { ButtonWidget } from "../Button/ButtonWidget";
import styled from "styled-components";
import Image from "next/image";
import UserIcon from "../../images/usericon.png";
import { useWalletAddress } from "hooks";
import { DisconnectIcon } from "icons";
import { Popover } from "@material-ui/core";
import { useWalletStyles } from "./styles/useWalletStyles";
import { useWeb3Context } from "don-components";
import { shortLargeAddress } from "helpers";
const AddressRoot = styled.div`
  background: #000000;
  min-height: 41px;
  padding: 11px 20px 11px 15px;
  width: "100%";
`;

const Content = styled.p<{ fontSize: string; color: string }>`
  font-family: "Poppins";
  font-size: ${(props) => props.fontSize};
  font-style: normal;
  font-weight: 500;
  margin: 0;
  color: ${(props) => props.color};
`;

const WhiteBox = styled.div`
  background: #fff;
  min-height: 40px;
  padding: 20px 15px 20px 15px;
  cursor: pointer;
  :hover {
    background: rgba(196, 196, 196, 0.14);
  }
`;

const Hr = styled.hr`
  border-top: 1px solid #ececec;
  margin: 0px;
`;

export const Wallet: React.FC = () => {
  const shortAddress = useWalletAddress({ short: true });
  let fullAddress = useWalletAddress({ short: false });
  fullAddress = shortLargeAddress(fullAddress, 12);
  const { disconnectDapp } = useWeb3Context();

  const [anchorEl, setAnchorEl] = React.useState<
    HTMLButtonElement | HTMLDivElement | null
  >(null);
  const classes = useWalletStyles();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonWidget
        className="d-flex align-items-center justify-content-center"
        varaint="outlined"
        height="40px"
        width="128px"
        onClick={handleClick}
      >
        <Image src={UserIcon} alt="UserIcon image not found" />
        <span className="ml-2"> {shortAddress} </span>
      </ButtonWidget>
      <Popover
        id={id}
        classes={{ paper: classes.paper }}
        open={open}
        anchorEl={anchorEl}
        disablePortal
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleClose}
      >
        <div className={classes.content}>
          <AddressRoot className="d-flex align-items-center flex-wrap">
            <Image src={UserIcon} alt="UserIcon image not found" />
            <Content className="ml-2" fontSize="13px" color="#fff">
              {fullAddress}
            </Content>
          </AddressRoot>
          {/* <WhiteBox className="d-flex align-items-center justify-content-between">
            <Content fontSize="14px" color="#000000">
              Change Wallet
            </Content>
            <WalletDarkIcon />
          </WhiteBox> */}

          <Hr />

          <WhiteBox
            className="d-flex align-items-center justify-content-between"
            onClick={disconnectDapp}
          >
            <Content fontSize="14px" color="#000000">
              Disconnect
            </Content>
            <DisconnectIcon />
          </WhiteBox>
        </div>
      </Popover>
    </>
  );
};
