import React from "react";
import { Container } from "react-bootstrap";
// import { Button } from "react-bootstrap";
import ButtonComponent from "../Button/Button";
import { Navbar, Nav, Dropdown, DropdownButton } from "react-bootstrap";
import "./NavbarStyle.scss";
import NotificationJson from "../../JsonData/NotificationJson";
import { NotificationIcon, UserIcon } from "../Icons";
import { Link } from "react-router-dom";
function NavBar(props) {
  return (
    <Navbar expand="lg" className="pt-4 pb-4 bg-none">
      <Container>
        <Navbar.Brand href="#">
          <img
            src="/assets/images/logo.png"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto mr-auto">
            <Nav.Link
              href="/resource"
              className={
                window.location.pathname === "/"
                  ? "colorBlack pr-md-5"
                  : "colorBlack pr-md-5 active"
              }
            >
              Resources
            </Nav.Link>
            <Nav.Link href="/farmers" className="colorBlack pr-md-5">
              Farmers
            </Nav.Link>
            <Nav.Link href="#" className="colorBlack">
              Developers
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Link to="/login">
          <ButtonComponent variant="colorBlack btn-outline">
            Connect wallet
          </ButtonComponent>
        </Link>
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
function NavBar2(props) {
  var aDay = 24 * 60 * 60 * 1000;
  return (
    <Navbar expand="lg" className="pt-4 pb-4 bgnav">
      <Container>
        <Navbar.Brand href="#">
          <img
            src="/assets/images/logo2.png"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto mr-auto">
            <Nav.Link href="/resource" className="colorBlack pr-md-5">
              Resources
            </Nav.Link>
            <Nav.Link href="/farmers" className="colorBlack pr-md-5 active">
              Farmers
            </Nav.Link>
            <Nav.Link href="#" className="colorBlack">
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
              <img
                src="/assets/images/notifications.png"
                className="d-inline-block align-top"
                alt="Image"
              />
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

          <a href="#">
            <img
              src="/assets/images/user.png"
              className="d-inline-block align-top mr-3 ml-2 ml-md-0 mr-md-4 mt-1"
              alt="Image"
            />
          </a>
        </div>
        <ButtonComponent variant="colorBlack btn-outline btnusername">
          <img
            src="/assets/images/usericon.png"
            className="d-inline-block align-top mr-md-2"
            alt="Image"
          />
          <span> OxOa...ec8e </span>
        </ButtonComponent>
      </Container>
    </Navbar>
  );
}

const NavBar3 = () => {
  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#000" }}
      className="pt-4 pb-4 text-white"
    >
      <Container>
        <Navbar.Brand href="#">
          <img
            src="/assets/images/logo-light.svg"
            className="d-inline-block align-top "
            alt="Logo"
            style={{ width: 100 }}
          />
        </Navbar.Brand>
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
          <span> OxOa...ec8e </span>
        </ButtonComponent>
      </Container>
    </Navbar>
  );
};

export { NavBar, NavBar2, NavBar3 };
