import { NavLink, useNavigate } from "react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "./auth/AuthProvider";

function NavBar() {
  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const handleOnLogout = async () => {
    logout();
    navigate("/home");
  };
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Navbar.Brand href="#home">Library Management System</Navbar.Brand>
            {isAuthenticated ? (
              <>
                <Nav.Link as={NavLink} to="/book">
                  Book
                </Nav.Link>
                <Nav.Link as={NavLink} to="/staff">
                  Staff
                </Nav.Link>
                <Nav.Link as={NavLink} to="/members">
                  Members
                </Nav.Link>
                <Nav.Link as={NavLink} to="/lending">
                  Lendings
                </Nav.Link>
                <Button className="ms-auto"  variant="warning" onClick={handleOnLogout}>logout</Button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/home">
                  SignIn Or SignUp
                </Nav.Link>
              </>
            )}


          </Nav>

         
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
