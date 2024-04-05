import React, { useState } from 'react';
import { Container, Form, Button, Breadcrumb, Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';

const ContactDetailsForm = () => {
  const [contactDetails, setcontactDetails] = useState({
    firstName: '',
    lastName: '',
    mobilePhone: ''
  });
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const { createOrderWithDetails } = useOrder();

  const handleChange = (e) => {
    setcontactDetails({ ...contactDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      console.log("Submitting Address Data:", contactDetails);
      createOrderWithDetails(contactDetails);
      navigate('/order-summary');
    }

    setValidated(true);
  };

  return (
    <div className='custom-background min-vh-100 d-flex justify-content-center align-items-start pt-5'>
    <Container className="rounded custom-container-backgrund p-4">
      <Breadcrumb>
        <Breadcrumb.Item href="/cart">Cart</Breadcrumb.Item>
        <Breadcrumb.Item active>Contact Details</Breadcrumb.Item>
      </Breadcrumb>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control 
              required 
              type="text" 
              name="firstName" 
              value={contactDetails.firstName} 
              onChange={handleChange} />
            <Form.Control.Feedback type="invalid">
            First Name is a required field
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
              required 
              type="text" 
              name="lastName" 
              value={contactDetails.lastName} 
              onChange={handleChange} />
            <Form.Control.Feedback type="invalid">
            Last Name is a required field
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="mobilePhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control 
              required 
              type="text" 
              name="mobilePhone" 
              value={contactDetails.mobilePhone} 
              onChange={handleChange} />
            <Form.Control.Feedback type="invalid">
            Phone Number is a required field
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button className="mt-3" variant='outline-dark' type="submit">Go to order summary</Button>
      </Form>
    </Container>
    </div>
  );
};

export default ContactDetailsForm;
