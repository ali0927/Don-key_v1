import React from "react";
import { Container } from "react-bootstrap";
// import { Button } from "react-bootstrap";
import ButtonComponent from "../Button/Button";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import "./NavbarStyle.scss";
import NotificationJson from "../../JsonData/NotificationJson";
import { NotificationIcon, UserIcon } from "../Icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { Logo } from "./Logo";
const shortenAddress = (val) => {
  return val.slice(0, 4) + "..." + val.slice(-4);
};

const useWalletAddress = ({ short = false }) => {
  const user = useSelector((state) => state.auth.user);
  const walletAddress = user
    ? user.walletAddress
    : "0x1341133ba79815e04e008f7635212bf086e821301";
  return short ? shortenAddress(walletAddress) : walletAddress;
};

function NavBar(props) {
  const history = useHistory();

  return (
    <Navbar expand="lg" className="pt-4 pb-4 bg-none">
      <Container>
        <Logo />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto mr-auto">
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
            <Nav.Link href="/farmers" className="colorBlack pr-md-5">
              Farmers
            </Nav.Link>
            <NavbarLink to="/team">Team</NavbarLink>
          </Nav>
        </Navbar.Collapse>
        <div className="position-relative mr-5 mr-sm-0">
          <ButtonComponent
            onClick={() => history.push("/dashboard")}
            variant="colorBlack btn-outline px-4"
          >
            DAPP
          </ButtonComponent>
        </div>
      </Container>
    </Navbar>
  );
}

function timeSince(date) {
  // var seconds = Math.floor((new Date() - date) / 1000);
  var seconds = Math.floor(new Date().getTime() / 1000 - date);
  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

const NavbarLink = ({ to, children }) => {
  const { pathname } = useLocation();

  return (
    <Link
      className={clsx("colorBlack pr-md-5", { active: pathname === to })}
      component={Nav.Link}
      to={to}
    >
      {children}
    </Link>
  );
};

//@ts-ignore
function NavBar2({ hideWallet = false, variant = "default" }) {
  const isAuth = useSelector(state => state.auth);
  const { isLoggedIn } = isAuth;
  const history = useHistory();
  const address = useWalletAddress({ short: true });
  return (
    <Navbar expand="lg" className="pt-4 pb-4 bgnav">
      <Container>
        <Logo />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto mr-auto">
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
                <NavbarLink to="/">Main</NavbarLink>
                <NavbarLink to="/dashboard">My Investments</NavbarLink>
                <NavbarLink to="/dashboard/farmer/me">
                  My Farmer Page
                </NavbarLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>


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

            <ButtonComponent onClick={() => history.push('/login')} variant="colorBlack btn-outline btnusername">
              Connect wallet
            </ButtonComponent>

        )}
      </Container>
    </Navbar>
  );
}

const NavBar3 = () => {
  const address = useWalletAddress({ short: true });
  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#000" }}
      className="pt-4 pb-4 text-white"
    >
      <Container>
        <LogoWhite />

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto mr-auto">
            <Nav.Link href="/resource" className=" text-white pr-md-5">
              Resources
            </Nav.Link>
            <Nav.Link href="/farmers" className=" text-white pr-md-5">
              Farmers
            </Nav.Link>
            <Nav.Link href="#" className="text-white">
              Developers
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <div className="">
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
        </div>
        <ButtonComponent variant="btn-outline btnusername btnusername--white">
          <img
            src="/assets/images/usericon.png"
            className="d-inline-block align-top mr-md-2"
            alt="Image"
          />
          <span> {address} </span>
        </ButtonComponent>
      </Container>
    </Navbar>
  );
};

export { NavBar, NavBar2, NavBar3 };
