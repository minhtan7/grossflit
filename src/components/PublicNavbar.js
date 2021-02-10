import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import SearchForm from "./SearchForm";

const PublicNavbar = ({ handleSubmit }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Navbar.Brand href="/">GrossFlit</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/movies/top_rated">Top rated</Nav.Link>
          <Nav.Link href="/movies/popular">Popular</Nav.Link>
          <NavDropdown title="Sort" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <SearchForm handleSubmit={handleSubmit} />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PublicNavbar;
