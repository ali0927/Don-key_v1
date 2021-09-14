/**eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from "react";
import { Container } from "react-bootstrap";
import ButtonComponent from "../Button/Button";
import { Navbar, Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Logo } from "./Logo";
import { INavBarProps } from "./interfaces/INavBarProps";
import { NavbarLink } from "./NavbarLink";
import { shortenAddress } from "don-utils";
import styled from "styled-components";
import { theme } from "theme";
// import { useReferralContext } from "contexts/ReferralContext";
import { BridgePopup } from "components/Bridgepopup/Bridgepopup";
import { ButtonWidget } from "components/Button";
import { useWeb3Context } from "don-components";

declare global {
  interface Window {
    ethereum: any;
  }
}


const useWalletAddress = ({ short = false }) => {
  const { address } = useWeb3Context();
  const walletAddress = address
    ? address
    : "0x1341133ba79815e04e008f7635212bf086e821301";
  return short ? shortenAddress(walletAddress) : walletAddress;
};


const StyledNavBar = styled(Navbar)`
  background-color: ${theme.palette.background.yellow};
  z-index: 10;
`;

const ConnectWalletButton = () => {
  const { connectDapp } = useWeb3Context();

  const [isDisabled, setIsDisabled] = useState(false);

  const handleConnection = async () => {
    setIsDisabled(true);
    try {
      await connectDapp(56);
    } finally {
      setIsDisabled(false);
    }
  };
  return (
    <ButtonComponent
      disabled={isDisabled}
      onClick={handleConnection}
      variant="colorBlack btn-outline btnusername"
    >
      Connect wallet
    </ButtonComponent>
  );
};

// const MyReferralNavLink = ({ variant }: { variant: string }) => {
//   const { hasSignedUp: isShown } = useReferralContext();

//   if (isShown) {
//     return (
//       <NavbarLink
//         to="/dashboard/referrals"
//         linkColor={variant === "builder" ? "white" : "black"}
//       >
//         My Referrals
//       </NavbarLink>
//     );
//   }
//   return <></>;
// };

function NavBar(props: INavBarProps) {
  const { variant = "landing", hideWallet = false } = props;
  const { connected, disconnectDapp } = useWeb3Context();
  const isLoggedIn = connected;
  const address = useWalletAddress({ short: true });
  const history = useRouter();

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
                    <NavbarLink
                      to="/dashboard/investment"
                      linkColor={variant === "builder" ? "white" : "black"}
                    >
                      My Investments
                    </NavbarLink>
                    <NavbarLink to="#">
                      <div
                        onClick={(e: any) => {
                          e.preventDefault();
                          handleOpen();
                        }}
                      >
                        {" "}
                        Bridge
                      </div>
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
                    onClick={() => history.push("/dashboard")}
                  >
                    DAPP
                  </ButtonWidget>
                </div>
              </>
            )}

            {variant === "loggedin" && (
              <>
                {isLoggedIn && !hideWallet ? (
                  <ButtonWidget varaint="outlined" height="50px" width="157px">
                    <img
                      src="/assets/images/usericon.png"
                      className="d-inline-block align-top mr-md-2"
                      alt="ImageNotFound"
                    />
                    <span> {address}</span>
                  </ButtonWidget>
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