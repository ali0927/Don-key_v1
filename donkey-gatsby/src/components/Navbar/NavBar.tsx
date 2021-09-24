/**eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from "react";
import { Container } from "react-bootstrap";
import ButtonComponent from "../Button/Button";
import { Navbar, Nav } from "react-bootstrap";
import clsx from "clsx";
import { Logo } from "./Logo";
import { INavBarProps } from "./interfaces/INavBarProps";
import { NavbarLink } from "./NavbarLink";
import { AuthToken } from "don-utils";
import styled from "styled-components";
import { theme } from "theme";
import { BridgePopup } from "components/Bridgepopup/Bridgepopup";
import { ButtonWidget } from "components/Button";
import { useWeb3Context } from "don-components";
import Web3 from "web3";
import { IUser } from "interfaces";
import { Wallet } from "../Wallet";
import { useWalletAddress } from "hooks";
import { useReferralContext } from "contexts/ReferralContext";
import { api } from "strapi";
import { navigate } from "gatsby-link";

const ConnectButton = styled(ButtonWidget)`
  border: 2px solid #222222;
  font-size: 13px; 
`;

declare global {
  interface Window {
    ethereum: any;
  }
}

const StyledNavBar = styled(Navbar)`
  background-color: ${theme.palette.background.yellow};
  z-index: 10;
`;

export const getNonce = async (publicAddress: string) => {
  const res = await api.post("/api/v2/login/nonce", {
    walletAddress: publicAddress,
  });
  const {
    data: { data },
  } = res;
  return data.nonce;
};

export const getAuthToken = async (
  publicAddress: string,
  signature: string
) => {
  const resps = await api.post("/api/v2/login", {
    signature,
    walletAddress: publicAddress,
  });
  const { token } = resps.data.data;
  const user = resps.data.user;
  return {
    token,
    user: user as IUser,
  };
};

export const getAuthTokenForPublicAddress = async (web3: Web3) => {
  const [publicAddress] = await web3.eth.getAccounts();
  const nonce = await getNonce(publicAddress);
  //@ts-ignore
  const signature = await web3.eth.personal.sign(nonce, publicAddress);

  return await getAuthToken(publicAddress, signature);
};

export const signUser = async (web3: Web3) => {
  const token = await getAuthTokenForPublicAddress(web3);
  localStorage.setItem(AuthToken, token.token);
};

const ConnectWalletButton = () => {
  const { connectDapp } = useWeb3Context();

  const [isDisabled, setIsDisabled] = useState(false);

  const handleConnection = async () => {
    setIsDisabled(true);
    await connectDapp();
  };
  return (
    <ConnectButton
      varaint="outlined"
      disabled={isDisabled}
      height="40px"
      width="160px"
      onClick={handleConnection}
    >
      Connect Wallet
    </ConnectButton>
  );
};

const MyReferralNavLink = ({ variant }: { variant: string }) => {
  const { hasSignedUp: isShown } = useReferralContext();

  if (isShown) {
    return (
      <NavbarLink
        to="/dashboard/referrals"
        linkColor={variant === "builder" ? "white" : "black"}
      >
        My Referrals
      </NavbarLink>
    );
  }
  return <></>;
};

function NavBar(props: INavBarProps) {
  const { variant = "landing", hideWallet = false } = props;
  const { connected, disconnectDapp } = useWeb3Context();
  const isLoggedIn = connected;
  const address = useWalletAddress({ short: true });
 
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <>
        <StyledNavBar
          expand="lg"
          className={clsx("pt-4 pb-4 bg-none", {
            bgnav: variant !== "landing" && variant !== "builder",
            "text-white navbar-buidler": variant === "builder",
          })}
        >
          <Container>
            <Logo />
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto mr-auto">
                {variant === "landing" && (
                  <>
                    <NavbarLink
                      to="/litepaper.pdf"
                      target="openInCurrentTab"
                      link
                    >
                      Litepaper
                    </NavbarLink>
                    <NavbarLink to="/farmers" linkColor="black">
                      Farmers
                    </NavbarLink>
                    <NavbarLink to="/team">Team</NavbarLink>
                    <NavbarLink
                      link
                      target="openInNewTab"
                      to="https://pancakeswap.finance/swap?inputCurrency=0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&outputCurrency=0x86B3F23B6e90F5bbfac59b5b2661134Ef8Ffd255"
                    >
                      $DON BEP20
                    </NavbarLink>
                    <NavbarLink
                      link
                      target="openInNewTab"
                      to="https://app.uniswap.org/#/swap?inputCurrency=0x217ddead61a42369a266f1fb754eb5d3ebadc88a&outputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7&use=V2"
                    >
                      $DON ERC20
                    </NavbarLink>
                  </>
                )}

                {(variant === "loggedin" || variant === "builder") && (
                  <>
                    <NavbarLink
                      to="/dashboard"
                      linkColor={variant === "builder" ? "white" : "black"}
                    >
                      Main
                    </NavbarLink>
                    {connected && (
                      <NavbarLink
                        to="/dashboard/investment"
                        linkColor={variant === "builder" ? "white" : "black"}
                      >
                        My Investments
                      </NavbarLink>
                    )}
                    {connected && <MyReferralNavLink variant={variant} />}
                    <NavbarLink
                      onClick={() => {
                        handleOpen();
                      }}
                      to="#"
                    >
                      Bridge
                    </NavbarLink>
                    {/* <MyReferralNavLink variant={variant} /> */}
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
            {variant === "landing" && (
              <>
                <div className="position-relative mr-5 mr-sm-0">
                  <ButtonWidget
                    varaint="outlined"
                    width="91px"
                    height="50px"
                    onClick={() => navigate("/dashboard")}
                  >
                    DAPP
                  </ButtonWidget>
                </div>
              </>
            )}

            {variant === "loggedin" && (
              <>
                {isLoggedIn && !hideWallet ? (
                  // <ButtonWidget varaint="outlined" height="50px" width="157px">
                  //   <img
                  //     src="/assets/images/usericon.png"
                  //     className="d-inline-block align-top mr-md-2"
                  //     alt="ImageNotFound"
                  //   />
                  //   <span> {address}</span>
                  // </ButtonWidget>
                  <Wallet />
                ) : (
                  <ConnectWalletButton />
                )}
              </>
            )}

            {variant === "builder" && (
              <>
                <ButtonComponent
                  onClick={disconnectDapp}
                  variant="btn-outline btnusername btnusername--white"
                >
                  <img
                    src="/assets/images/usericon.png"
                    className="d-inline-block align-top mr-md-2"
                    alt="ImageNotFound"
                  />
                  <span> {address} </span>
                </ButtonComponent>
              </>
            )}
          </Container>
          {isOpen && <BridgePopup onClose={handleClose} />}
        </StyledNavBar>
      </>
    </>
  );
}

export { NavBar };
