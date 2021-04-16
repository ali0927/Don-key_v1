import React, { useState } from "react";
import { Container } from "react-bootstrap";
// import { Button } from "react-bootstrap";
import ButtonComponent from "../Button/Button";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import "./NavbarStyle.scss";
import NotificationJson from "../../JsonData/NotificationJson";
import { NotificationIcon, UserIcon } from "../Icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { Logo } from "./Logo";
import { LogoWhite } from "components/Footer/LogoWhite";
import { INavBarProps } from "./interfaces/INavBarProps";
import { NavbarLink } from "./NavbarLink";
import { useMetaMaskLogin } from "hooks/useMetaMaskLogin";
import {shortenAddress} from "don-utils";


const useWalletAddress = ({ short = false }) => {
  const user = useSelector((state: any) => state.auth.user);
  const walletAddress = user
    ? user.walletAddress
    : "0x1341133ba79815e04e008f7635212bf086e821301";
  return short ? shortenAddress(walletAddress) : walletAddress;
};

function NavBar(props: INavBarProps) {
  const { variant = "landing", hideWallet = false } = props;
  const isAuth = useSelector((state: any) => state.auth);
  const { isLoggedIn } = isAuth;
  const address = useWalletAddress({ short: true });
  const history = useHistory();

  const getLogo = React.useCallback(() => {
    if (variant === "builder") {
      return <LogoWhite />;
    }
    return <Logo />;
  }, [variant]);

  const {doMetaMaskLogin} = useMetaMaskLogin();

  const [isDisabled, setIsDisabled] = useState(false);

  const handleConnection = async () => {
    setIsDisabled(true)
    try {
      await doMetaMaskLogin()
    }finally {
      setIsDisabled(false)
    }
  }


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
                      href="https://www.docdroid.net/va1jKlE/by-litepaper-8-pdf"
                      className={
                        window.location.pathname === "/"
                          ? "colorBlack pr-md-5"
                          : "colorBlack pr-md-5 active"
                      }
                    >
                      Litepaper
                    </Nav.Link>
                    <NavbarLink to="/farmers" linkColor="black">
                      Farmers
                    </NavbarLink>
                    <NavbarLink to="/team">Team</NavbarLink>
                  </>
                )}

                {variant === "default" && (
                  <>
                    <Nav.Link
                      href="https://www.docdroid.net/va1jKlE/by-litepaper-8-pdf"
                      className={"colorBlack pr-md-5"}
                    >
                      Litepaper
                    </Nav.Link>
                    <NavbarLink to="/farmers">Farmers</NavbarLink>
                    <NavbarLink to="/team">Team</NavbarLink>
                  </>
                )}
                {variant === "loggedin" && (
                  <>
                    <NavbarLink to="/dashboard">Main</NavbarLink>
                    <NavbarLink to="/dashboard/investment">My Investments</NavbarLink>
                    <NavbarLink to="/dashboard/farmer/me">
                      My Farmer Page
                    </NavbarLink>
                  </>
                )}
                {variant === "builder" && (
                  <>
                    <NavbarLink to="/resource" linkColor="white">
                      Resources
                    </NavbarLink>
                    <NavbarLink to="/farmers" linkColor="white">
                      Farmers
                    </NavbarLink>
                    <NavbarLink to="#" linkColor="white">
                      Developers
                    </NavbarLink>

                    {/* <div className="">
                <Dropdown className="dropNav1">
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
                </a>
              </div> */}
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
            {variant === "landing" && (
              <div className="position-relative mr-5 mr-sm-0">
                <ButtonComponent
                  onClick={() => history.push("/dashboard")}
                  variant="colorBlack btn-outline px-4"
                >
                  DAPP
                </ButtonComponent>
              </div>
            )}

            {(variant === "default" || variant === "loggedin") && (
              <>
                {isLoggedIn && !hideWallet ? (
                  <ButtonComponent variant="colorBlack btn-outline btnusername">
                    <img
                      src="/assets/images/usericon.png"
                      className="d-inline-block align-top mr-md-2"
                      alt="Image"
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
                    alt="Image"
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
