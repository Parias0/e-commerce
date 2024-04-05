import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

const ResetPasswordRequestForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { requestPasswordReset } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await requestPasswordReset(email);
      setMessage("Link to reset password has been sent to your email.");
    } catch (error) {
      setMessage("Failed to send reset password link.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Send Reset Link
            </Button>
            {message && <div className="text-info mt-3">{message}</div>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPasswordRequestForm;