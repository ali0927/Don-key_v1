import React from "react";
import { Container } from "react-bootstrap";
// import { Button } from "react-bootstrap";
import ButtonComponent from "../Button/Button";
import { Navbar, Nav, Dropdown, DropdownButton } from "react-bootstrap";
import "./NavbarStyle.scss";

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
        <ButtonComponent variant="colorBlack btn-outline">
          Connect wallet
        </ButtonComponent>
      </Container>
    </Navbar>
  );
}

function NavBar2(props) {
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
              <Dropdown.Item href="#">
                <p>
                  Your <strong> «New strategy» </strong> has been approve and is
                  ready to launch
                </p>
                <span>5 mins ago</span>
              </Dropdown.Item>

              <Dropdown.Item href="#">
                <p>
                  Your <strong> «Strategy 3» </strong> has been approve and is
                  ready to launch ready to launch
                </p>
                <span>9 hours ago</span>
              </Dropdown.Item>

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

export { NavBar, NavBar2 };
