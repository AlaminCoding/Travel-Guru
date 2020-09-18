import React, { useContext } from "react";
import "./header.css";
import logo from "../../logo.png";
import { Container, Navbar, Nav, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
const Header = () => {
  const { userPass } = useContext(UserContext);
  const [user, setUser] = userPass;
  return (
    <header>
      <Container>
        <Navbar expand="lg">
          <Navbar.Brand href="#home">
            <Link to="/">
              <img src={logo} alt="Site logo" className="logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <FormControl
                type="text"
                className="search-input"
                placeholder="Search Your Destination"
              />
              <Nav.Link href="#home">News</Nav.Link>
              <Nav.Link href="#link">Destination</Nav.Link>
              <Nav.Link href="#blog">Blog</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
              <Nav.Link href="#login">
                <Link to="/login">
                  <Button className="login-btn">
                    {user.isSignIn ? "Profile" : "Login"}
                  </Button>
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
