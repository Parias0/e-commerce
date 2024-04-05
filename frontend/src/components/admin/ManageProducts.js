import React, { useState, useEffect, useContext, useCallback } from "react"
import Select from "react-select"
import { Container, Form, Button, ListGroup, Row, Col } from "react-bootstrap"
import AdminService from "../../services/AdminService"
import { AuthContext } from "../../context/AuthContext"
import { useProductContext } from "../../context/ProductContext"

const ManageProducts = () => {
	const [productForm, setProductForm] = useState({
		name: "",
		description: "",
		price: "",
		genre: "",
		quantity: "",
		image: "",
		status: "",
		platforms: [],
	})
	const [editing, setEditing] = useState(false)
	const { currentUser } = useContext(AuthContext)
	const { products, genres, platforms, fetchAllProducts } = useProductContext();
	const [selectedPlatforms, setSelectedPlatforms] = useState([])

	

	useEffect(() => {
		fetchAllProducts(0,100)
	}, [fetchAllProducts])

	const handleInputChange = useCallback(
		e => {
			if (e.target.name === "genre") {
				const genreId = parseInt(e.target.value, 10)
				const selectedGenre = genres.find(genre => genre.id === genreId) || ""
				setProductForm({ ...productForm, genre: selectedGenre })
			} else {
				setProductForm({ ...productForm, [e.target.name]: e.target.value })
			}
		},
		[productForm, genres]
	)

	const handlePlatformChange = useCallback(selectedOptions => {
		setSelectedPlatforms(selectedOptions.map(option => option.value))
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		console.log("Submitting product:", productForm)
		console.log("Selected platforms:", selectedPlatforms)
		const token = currentUser.token

		const platformObjects = selectedPlatforms.map(id => ({ id }))

		const productData = {
			...productForm,
			platforms: platformObjects,
			genre: productForm.genre && typeof productForm.genre === 'object' ? productForm.genre : null
		}

		console.log("Sending product data to backend:", productData)

		if (editing) {
			try {
				await AdminService.updateProduct(productForm.id, productData, token)
				alert("Updated product")
			} catch (error) {
				console.error("Error updating product:", error)
			}
		} else {
			try {
				await AdminService.addProduct(productData, token)
				alert("Product added")
			} catch (error) {
				console.error("Error adding product:", error)
			}
		}

		setEditing(false)
		setProductForm({
			name: "",
			description: "",
			price: "",
			genre: "",
			quantity: "",
			image: "",
			status: "",
			platforms: [],
		})
		setSelectedPlatforms([]);
		fetchAllProducts()
	}

	const handleEdit = product => {
		setEditing(true);
		
	
		const genreObject = product.genre ? genres.find(g => g.id === product.genre.id) : '';

    	setProductForm({
        ...product,
        genre: genreObject,
    	});
	
		const platformIds = product.platforms.map(p => p.id);
		setSelectedPlatforms(platformIds);
	};
	

	const handleCancel = () => {
		setProductForm({
			name: "",
			description: "",
			price: "",
			genre: "",
			quantity: "",
			image: "",
			status: "",
		})
		setSelectedPlatforms([])
		setEditing(false)
	}

	const platformOptions = platforms.map(platform => ({
		value: platform.id,
		label: platform.name,
	}))

	const selectedPlatformOptions = selectedPlatforms.map(id =>
		platformOptions.find(option => option.value === id)
	)

	return (
			<div>
				<Container className='bg-light p-3'>
					<h2 className='m-2'>{editing ? "Edit Game" : "Add New Game"}</h2>
					<Form onSubmit={handleSubmit}>
						<Row>
							<Col>
								<Form.Group className='mb-3'>
									<Form.Label>Game Name</Form.Label>
									<Form.Control
										type='text'
										name='name'
										value={productForm.name}
										onChange={handleInputChange}
										placeholder='Nazwa produktu'
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className='mb-3'>
									<Form.Label>Price</Form.Label>
									<Form.Control
										type='number'
										name='price'
										value={productForm.price}
										onChange={handleInputChange}
										placeholder='Cena'
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className='mb-3'>
									<Form.Label>Quantity</Form.Label>
									<Form.Control
										type='number'
										name='quantity'
										value={productForm.quantity}
										onChange={handleInputChange}
										placeholder='Ilość'
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group className='mb-3'>
									<Form.Label>Genre</Form.Label>
									<Form.Control
										as='select'
										name='genre'
										value={productForm.genre ? productForm.genre.id : ""}
										onChange={handleInputChange}>
										<option value=''>Select Genre</option>
										{genres.map(genre => (
											<option key={genre.id} value={genre.id}>
												{genre.name}
											</option>
										))}
									</Form.Control>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className='mb-3'>
									<Form.Label>Platforms</Form.Label>
									<Select
										options={platformOptions}
										value={selectedPlatformOptions}
										onChange={handlePlatformChange}
										isMulti
										closeMenuOnSelect={false}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Form.Group className='mb-3'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								as='textarea'
								name='description'
								value={productForm.description}
								onChange={handleInputChange}
								placeholder='Opis produktu'
								rows={3}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Image Link</Form.Label>
							<Form.Control
								type='text'
								name='image'
								value={productForm.image}
								onChange={handleInputChange}
								placeholder='Link do obrazu produktu'
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Status</Form.Label>
							<Form.Control
								type='text'
								name='status'
								value={productForm.status}
								onChange={handleInputChange}
								placeholder='Status'
							/>
						</Form.Group>

						<Button variant='secondary' onClick={handleCancel} className='me-4'>
							Clear Form
						</Button>
						<Button type='submit'>{editing ? "Update" : "Add New Game"}</Button>
					</Form>

					<h2 className='m-2 py-4'>List of Games</h2>
					<ListGroup>
						{products.map(product => (
							<ListGroup.Item
								key={product.id}
								action
								onClick={() => handleEdit(product)}
								className='m-1 border rounded'>
								{product.name}
							</ListGroup.Item>
						))}
					</ListGroup>
				</Container>
			</div>
	)
}

export default ManageProducts
