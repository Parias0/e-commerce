import React, { useState } from "react";
import {
	Card,
	Button,
	ListGroupItem,
	Container,
	Row,
	Col,
} from "react-bootstrap"
import Navbars from "../Navbars"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"

const Cart = () => {
	const { cart, totalAmount, addToCart, removeFromCart, clearCart } = useCart()
	const [debounceTimers, setDebounceTimers] = useState({})
	const navigate = useNavigate()

	const handleQuantityChange = (productId, change) => {
		if (debounceTimers[productId]) {
			clearTimeout(debounceTimers[productId])
		}

		const newTimer = setTimeout(() => {
			if (change === 1) {
				addToCart(productId, 1)
			} else if (change === -1) {
				removeFromCart(productId, 1)
			}
		}, 500) // 0.5 sekunda opóźnienia

		setDebounceTimers({ ...debounceTimers, [productId]: newTimer })
	}

	const navigateToProducts = () => {
		navigate("/ProductsPage")
	}

	const handleContactDetails = () => {
        
        navigate("/contact-form");
    };

	if (!cart) {
		return <div>Loading...</div>
	}

	const cardImageStyle = {
		width: "160px",
		height: "160px",
		objectFit: "cover",
		margin: "10px",
	}

	return (
		<div className='custom-background min-vh-100'>
			<Navbars />
			<Container>
				<h2 className='my-4 text-white'>Twój Koszyk</h2>
				<Row>
					<Col md={8}>
						{cart.length === 0 ? (
							<Card className='text-center bg-light'>
								<Card.Body>
									<Card.Text>Cart is empty</Card.Text>
									<Button variant='primary' onClick={navigateToProducts}>
										Browse offers
									</Button>
								</Card.Body>
							</Card>
						) : (
							cart.map(product => (
								<Card
									key={product.id}
									className='mb-4 bg-light d-flex flex-row align-items-center'>
									<Card.Img
										variant='left'
										src={product.image}
										style={cardImageStyle}
									/>
									<Card.Body className='flex-grow-1'>
										<Card.Title>{product.name}</Card.Title>
										<div>
											<Button
												variant='outline-secondary'
												onClick={() => handleQuantityChange(product.id, -1)}>
												-
											</Button>
											<span className='mx-2'>{product.quantity}</span>
											<Button
												variant='outline-secondary'
												onClick={() => handleQuantityChange(product.id, 1)}>
												+
											</Button>
										</div>
									</Card.Body>
									<ListGroupItem
										className='ms-auto p-2'
										style={{ border: "none", backgroundColor: "transparent" }}>
										<strong>{product.price} USD</strong>
									</ListGroupItem>
								</Card>
							))
						)}
					</Col>
					<Col md={4}>
						<Card className='mb-4 sticky-top bg-light'>
							<Card.Body>
								<Card.Title>Order summary</Card.Title>
								<Card.Text>Total amount: {totalAmount} USD</Card.Text>
								<div className='d-flex justify-content-between'>
									<Button
										variant='danger'
										onClick={clearCart}
										className='flex-grow-1 me-2'>
										Clear the cart
									</Button>
									<Button
										variant='outline-dark'
										onClick={handleContactDetails}
										disabled={cart.length === 0}
										className='flex-grow-1'>
										Contact details
									</Button>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default Cart
