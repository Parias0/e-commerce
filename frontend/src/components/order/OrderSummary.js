import React from 'react';
import { Container, Card, ListGroup, Button, Breadcrumb } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';


const OrderSummary = () => {
  const { orderDetails, createOrder } = useOrder();
  const navigate = useNavigate();

  const handleConfirmOrder = () => {
    if (orderDetails) {
      console.log("Confirming Order with Data:", orderDetails);
      createOrder({
        productIds: orderDetails.products.map(p => p.id),
        quantities: orderDetails.products.map(p => p.quantity),
        ...orderDetails.contactDetails, 
      }).then(() => {
        navigate('/payment');
      });
    }
  };

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className='custom-background min-vh-100 d-flex justify-content-center align-items-start pt-5'>
    <Container className="my-4 ">
    <Breadcrumb>
        <Breadcrumb.Item href="/cart">Cart</Breadcrumb.Item>
        <Breadcrumb.Item href="/contact-form">Contact Details</Breadcrumb.Item>
        <Breadcrumb.Item active style={{ color: 'white' }}>Order Summary</Breadcrumb.Item>
      </Breadcrumb>
      <h2 style={{ color: 'white' }}>Order Summary</h2>
      <Card className='custom-container-backgrund '>
        <Card.Header>Contact Details</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>{orderDetails.contactDetails.firstName} {orderDetails.contactDetails.lastName}</ListGroup.Item>
          <ListGroup.Item>+48 {orderDetails.contactDetails.mobilePhone}</ListGroup.Item>
        </ListGroup>
      </Card>
      <Card className="mt-3 custom-container-backgrund ">
        <Card.Header>Products</Card.Header>
        <ListGroup variant="flush">
          {orderDetails.products.map(product => (
            <ListGroup.Item key={product.id}>
              {product.name} - {product.quantity} - {product.price} USD
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      <div className="mt-3">
        <h3 style={{ color: 'white' }}>Total amount: {orderDetails.totalAmount} USD</h3>
        <Button variant="success" onClick={handleConfirmOrder}>
         Confirm order
        </Button>
      </div>
    </Container>
    </div>
  );
};

export default OrderSummary;
