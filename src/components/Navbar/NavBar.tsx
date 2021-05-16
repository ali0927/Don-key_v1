import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
// import { Button } from "react-bootstrap";
import ButtonComponent from "../Button/Button";
import { Navbar, Nav } from "react-bootstrap";
import "./NavbarStyle.scss";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { Logo } from "./Logo";
import { LogoWhite } from "components/Footer/LogoWhite";
import { INavBarProps } from "./interfaces/INavBarProps";
import { NavbarLink } from "./NavbarLink";
import { useMetaMaskLogin } from "hooks/useMetaMaskLogin";
import { shortenAddress } from "don-utils";
import { IStoreState } from "interfaces";
import { useWeb3 } from "don-components";
import { ErrorSnackbar } from "components/Snackbars";
import { useSnackbar } from "notistack";
import comingsoon from "images/comingsoon.svg";
import styled from "styled-components";

declare global {
  interface Window {
    ethereum: any;
  }
}

const ImageCommingSoon = styled.img`
  position: absolute;
  top: -25px;
  right: 3%;
`;

const useWalletAddress = ({ short = false }) => {
  const user = useSelector((state: any) => state.auth.user);
  const walletAddress = user
    ? user.walletAddress
    : "0x1341133ba79815e04e008f7635212bf086e821301";
  return short ? shortenAddress(walletAddress) : walletAddress;
};

export const NotificationComp = () => {
  return (
    <div className="">
      {/* <Dropdown className="dropNav1">
        <Dropdown.Toggle
          id="dropdown-basic"
          className=" mr-0 ml-2 ml-md-0 mr-md-2"
        >
          <NotificationIcon className="notification-icon" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <p className="notifyHead">Notifications</p>

          {NotificationJson.map((item, index) => {
            return (
              <Dropdown.Item href="#">
                <p>{item.notification}</p>
                <span>{timeSince(item.date)}</span>
              </Dropdown.Item>
            );
          })}
          <div className="viewDrop">
            <a href="#"> View All</a>
          </div>
        </Dropdown.Menu>
      </Dropdown>

      <a href="#" className="mr-3">
        <UserIcon className="user-icon" />
      </a> */}
    </div>
  );
};

function NavBar(props: INavBarProps) {
  const { variant = "landing", hideWallet = false } = props;
  const isAuth = useSelector((state: IStoreState) => state.auth);
  const farmerDetails = useSelector((state: IStoreState) => state.farmer);
  const { isLoggedIn } = isAuth;
  const address = useWalletAddress({ short: true });
  const history = useHistory();

  const getLogo = React.useCallback(() => {
    if (variant === "builder") {
      return <LogoWhite />;
    }
    return <Logo />;
  }, [variant]);

  const { doMetaMaskLogin } = useMetaMaskLogin();

  const [isDisabled, setIsDisabled] = useState(false);

  const handleConnection = async () => {
    setIsDisabled(true);
    try {
      await doMetaMaskLogin();
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <>
      <>
        <Navbar
          expand="lg"
          className={clsx("pt-4 pb-4 bg-none", {
            bgnav: variant !== "landing" && variant !== "builder",
            "text-white navbar-buidler": variant === "builder",
          })}
        >
          <Container>
            {getLogo()}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto mr-auto">
                {variant === "landing" && (
                  <>
                    <Nav.Link
                      href="/litepaper.pdf"
                      className={"colorBlack pr-md-5"}
                    >
                      Litepaper
                    </Nav.Link>
                    <NavbarLink to="/farmers" linkColor="black">
                      Farmers
                    </NavbarLink>
                    <NavbarLink to="/team">Team</NavbarLink>
                    <NavbarLink
                      target="openInNewTab"
                      to="https://exchange.pancakeswap.finance/#/swap?inputCurrency=0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&outputCurrency=0x86b3f23b6e90f5bbfac59b5b2661134ef8ffd255"
                    >
                      $DON BEP20
                    </NavbarLink>
                    <NavbarLink
                      target="openInNewTab"
                      to="https://app.uniswap.org/#/swap?inputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7&outputCurrency=0x217ddead61a42369a266f1fb754eb5d3ebadc88a&use=V2"
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
                    {farmerDetails?.poolAddress ? (
                      <NavbarLink
                        to="/dashboard/farmer/me"
                        linkColor={variant === "builder" ? "white" : "black"}
                      >
                        My Farmer Bio
                      </NavbarLink>
                    ) : (
                      <NavbarLink
                        to="/dashboard/farmer/signup"
                        linkColor={variant === "builder" ? "white" : "black"}
                      >
                        Become a Farmer
                      </NavbarLink>
                    )}
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
            {variant === "landing" && (
              <>
                <div className="position-relative mr-5 mr-sm-0">
                  <ButtonComponent
                    disabled
                    // onClick={() => history.push("/dashboard")}
                    variant="colorBlack btn-outline position-relative px-4"
                    // className="mt-4"
                  >
                    <ImageCommingSoon src={comingsoon} />
                    DAPP
                  </ButtonComponent>
                </div>
              </>
            )}

            {variant === "loggedin" && (
              <>
                {isLoggedIn && !hideWallet ? (
                  <ButtonComponent variant="colorBlack btn-outline btnusername">
                    <img
                      src="/assets/images/usericon.png"
                      className="d-inline-block align-top mr-md-2"
                      alt="ImageNotFound"
                    />
                    <span> {address}</span>
                  </ButtonComponent>
                ) : (
                  <ButtonComponent
                    disabled={isDisabled}
                    onClick={handleConnection}
                    variant="colorBlack btn-outline btnusername"
                  >
                    Connect wallet
                  </ButtonComponent>
                )}
              </>
            )}

            {variant === "builder" && (
              <>
                <ButtonComponent variant="btn-outline btnusername btnusername--white">
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
        </Navbar>
      </>
    </>
  );
}

export { NavBar };
