import React, { useState } from "react";
import { SignIn } from "./SignIn";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { SignUp } from "./SignUp";

export const Home = () => {
  const handleClose = () => setShowLoginForm(false);
  const handleOnClose = () => setShowSignupForm(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  return (
    <div
    style={{
      backgroundColor: "#1383e5",
      minHeight: "80vh", // Cover full screen height
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
      <Row>
        <Col>
          <div style={{
            border: "3px solid rgb(44, 72, 214)",
            borderRadius: "10px",
            padding: "30px",
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            boxShadow: "20px 20px 20px rgba(0, 0, 0.12, 0.12)",
          }}>
            <h2 className="mb-5">Library Management System</h2>
            <Button
              variant="outline-primary"
              onClick={() => setShowLoginForm(true)}
              className="me-3"
            >
              Sign in
            </Button>

            <Button
              variant="outline-primary"
              onClick={() => setShowSignupForm(true)}
            >
              Sign up
            </Button>
          </div>

          <SignIn show={showLoginForm} handleClose={handleClose} />
          <SignUp show={showSignupForm} handleClose={handleOnClose} />
        </Col>
      </Row>
    </Container>
    </div>
  );
};
