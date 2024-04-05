import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const CancelPage = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/');
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Row>
        <Col md={6} className="text-center">
          <h2>Transaction Cancelled</h2>
          <p>It looks like you've cancelled the payment process.</p>
          <p>If you encountered any issues, please contact us or try again.</p>
          <Button variant="primary" onClick={handleReturn} style={{ marginTop: '20px' }}>
            Return to Shop
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CancelPage;
