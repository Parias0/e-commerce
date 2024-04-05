import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Row>
        <Col md={6} className="text-center">
          <h2>Thank You for Your Order!</h2>
          <p>Your transaction has been completed successfully. An order confirmation has been sent to your email.</p>
          <Button variant="primary" onClick={handleGoHome}>Return to Home Page</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SuccessPage;

