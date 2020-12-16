import React from "react";
import { Container } from "react-bootstrap";
// import { Button } from "react-bootstrap";
import ButtonComponent from "../Button/Button";
import { Navbar, Nav } from "react-bootstrap";
import "./NavbarStyle.scss";

function NavBar(props) {
  return (
    // <Navbar expand="lg" className="pt-4 pb-4">
    //   <Container>
    //     <Navbar.Brand href="#">
    //       <img
    //         src="/assets/images/logo.png"
    //         className="d-inline-block align-top"
    //         alt="Logo"
    //       />
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="ml-auto mr-auto">
    //         <Nav.Link href="/resource" className="colorBlack pr-md-5">
    //           Resources
    //         </Nav.Link>
    //         <Nav.Link href="#" className="colorBlack pr-md-5">
    //           Farmers
    //         </Nav.Link>
    //         <Nav.Link href="#" className="colorBlack">
    //           Developers
    //         </Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //     <ButtonComponent variant="colorBlack btn-outline">
    //       Connect wallet
    //     </ButtonComponent>
    //   </Container>
    // </Navbar>

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
            <Nav.Link href="/resource" className="colorBlack pr-md-5 active">
              Resources
            </Nav.Link>
            <Nav.Link href="#" className="colorBlack pr-md-5">
              Farmers
            </Nav.Link>
            <Nav.Link href="#" className="colorBlack">
              Developers
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <div className="">
          <a href="#">
            <img
              src="/assets/images/notifications.png"
              className="d-inline-block align-top mr-3 ml-2 ml-md-0 mr-md-4"
              alt="Logo"
            />
          </a>
          <a href="#">
            <img
              src="/assets/images/user.png"
              className="d-inline-block align-top mr-3 ml-2 ml-md-0 mr-md-4"
              alt="Logo"
            />
          </a>
        </div>
        <ButtonComponent variant="colorBlack btn-outline btnusername">
          <img
            src="/assets/images/usericon.png"
            className="d-inline-block align-top mr-md-2"
            alt="Logo"
          />
          <span> OxOa...ec8e </span>
        </ButtonComponent>
      </Container>
    </Navbar>
  );
}

export default NavBar;
