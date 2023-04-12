import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import SearchForm from "./SearchForm";
import { Link } from "react-router-dom";

const PublicNavbar = ({ handleSubmit }) => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      style={{ maxWidth: "1440px" }}
      className="nav nav-color"
    >
      <Navbar.Brand as={Link} to="/">
        <img
          src="https://res.cloudinary.com/tanvo/image/upload/v1618421541/moviedb/movie-db-logo_x33fp0.png"
          alt=""
          style={{ width: "10rem" }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/movies/top_rated">
            Top rated
          </Nav.Link>
          <Nav.Link as={Link} to="/movies/popular">
            Popular
          </Nav.Link>
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
