import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import Navbars from "../components/Navbars";
import PlatformIcons from "../components/products/PlatformIcons";
import { useCart } from "../context/CartContext";
import ProductService from "../services/ProductService";
import FavoriteService from "../services/FavoriteService";
import { AuthContext } from "../context/AuthContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function ProductDetailPage() {
	const { productId } = useParams()
	const [product, setProduct] = useState(null)
	const [favorites, setFavorites] = useState(new Set())
	const { addToCart } = useCart()
	const [showModal, setShowModal] = useState(false)
	const navigate = useNavigate()
	const { currentUser } = useContext(AuthContext)
	const numericProductId = Number(productId)

	useEffect(() => {
		ProductService.getProductById(productId)
			.then(response => {
				setProduct(response.data)
			})
			.catch(error => {
				console.error("Error fetching product details:", error)
			})

		if (currentUser) {
			FavoriteService.getFavorites(currentUser.token)
				.then(response => {
					const favoriteProductIds = new Set(
						response.data.map(fav => Number(fav.productId))
					)
					setFavorites(favoriteProductIds)
				})
				.catch(error => {
					console.error("Error fetching favorites:", error)
				})
		}
	}, [productId, currentUser])

	const toggleFavorite = productId => {
		if (!currentUser) return

		FavoriteService.toggleFavorite(productId, currentUser.token)
			.then(() => {
				setFavorites(prev => {
					const newFavorites = new Set(prev)
					if (newFavorites.has(productId)) {
						newFavorites.delete(productId)
					} else {
						newFavorites.add(productId)
					}
					return newFavorites
				})
			})
			.catch(error => {
				console.error("Error toggling favorite:", error)
			})
	}

	const handleAddToCart = () => {
		if (product && productId) {
			addToCart(productId, 1)
			setShowModal(true)
		}
	}

	const handleCloseModal = () => {
		setShowModal(false)
	}

	const handleGoToCart = () => {
		setShowModal(false)
		navigate("/cart")
	}

	if (!product) {
		return <div>Loading...</div>
	}

	return (
		<div>
			<Navbars />
			<div className='d-flex flex-column vh-100 bg-dark'>
				<Container className='bg-light p-4 flex-fill border-2 bg-light flex-fill'>
					<Row className='my-3 align-items-start'>
						<Col md={6} xs={12} className='mb-3'>
							<img
								src={product.image}
								alt={product.name}
								style={{
									width: "100%",
									height: "auto",
									objectFit: "cover",
									borderRadius: "10px",
								}}
							/>
						</Col>
						<Col md={6} xs={12}>
							<h1 className='display-4'>{product.name}</h1>
							<p>{product.description}</p>
							<p>
								<b>Genre: </b>
								{product.genre.name}
							</p>
							<p>
								<b>Platforms: </b>
								<PlatformIcons platforms={product.platforms} />
							</p>
							<p className='font-weight-bold'>
								<b>Price: </b>
								{product.price} USD
							</p>
							<Button variant='info' onClick={handleAddToCart}>
								ADD TO CART
							</Button>
							<span
								onClick={() => toggleFavorite(numericProductId)}
								style={{ cursor: "pointer", marginLeft: "10px" }}>
								{favorites.has(numericProductId) ? (
									<FaHeart color='red' />
								) : (
									<FaRegHeart />
								)}
							</span>
						</Col>
					</Row>
				</Container>
			</div>
			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>Produkt dodany do koszyka</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Produkt został pomyślnie dodany do Twojego koszyka.
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleCloseModal}>
						Kontynuuj zakupy
					</Button>
					<Button variant='primary' onClick={handleGoToCart}>
						Przejdź do koszyka
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default ProductDetailPage
