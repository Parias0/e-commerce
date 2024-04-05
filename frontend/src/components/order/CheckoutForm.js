import React, { useState } from "react";
import { useOrder } from "../../context/OrderContext";
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';

const CheckoutForm = () => {
	const { orderDetails } = useOrder()
	const [error, setError] = useState(null)

	const initiatePaymentProcess = async () => {
		if (
			orderDetails &&
			orderDetails.productIds &&
			orderDetails.quantities &&
			orderDetails.orderId
		) {
			const items = orderDetails.productIds.map((productId, index) => ({
				productId: productId,
				quantity: orderDetails.quantities[index],
			}))

			try {
				const user = JSON.parse(localStorage.getItem("user"))
				const token = user?.token

				const response = await fetch(
					"http://localhost:8080/api/payments/create-checkout-session",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ orderId: orderDetails.orderId, items }), // Włączenie orderId w żądanie
					}
				)

				if (!response.ok) {
					throw new Error("Network response was not ok")
				}

				const contentType = response.headers.get("content-type")
				if (!contentType || !contentType.includes("application/json")) {
					const textResponse = await response.text()
					window.location.href = textResponse // Przekierowanie do URL
				} else {
					const data = await response.json()
					if (data && data.url) {
						window.location.href = data.url // Przekierowanie do sesji płatności Stripe
					}
				}
			} catch (err) {
				setError("Nie udało się utworzyć sesji płatności.")
				console.error("Error creating payment session:", err)
			}
		} else {
			setError("Informacje o zamówieniu są niekompletne.")
		}
	}

	return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Row>
        <Col md={12} className="text-center">
          {error && <Alert variant="danger">{error}</Alert>}

          <p className="mb-3">You will be redirected to the payment form.</p>

          <Button variant="primary" onClick={initiatePaymentProcess}>
            Proceed to Payment
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckoutForm
