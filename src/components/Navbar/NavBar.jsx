import React from "react";
import { Container } from "react-bootstrap";
// import { Button } from "react-bootstrap";
import ButtonComponent from "../Button/Button";
import { Navbar, Nav } from "react-bootstrap";
import "./NavbarStyle.scss";

function NavBar(props) {
  return (
    <Navbar expand="lg" className="pt-4 pb-4">
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
            <Nav.Link href="#" className="colorBlack pr-md-5">
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
        <ButtonComponent
          variant="colorBlack btn-outline d-md-inline-block d-none"
          buttonText="Connect wallet"
        />
      </Container>
    </Navbar>
  );
}

export default NavBar;
