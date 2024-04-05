import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import ProductService from "../services/ProductService";
import { Navbar, Container, Nav, Form, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Navbars() {
	const navigate = useNavigate()
	const { currentUser, logout } = useContext(AuthContext)
	const { cart } = useContext(CartContext)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState("")
	const [searchResults, setSearchResults] = useState([])

	const handleDropdownToggle = isOpen => {
		setIsDropdownOpen(isOpen)
	}

	const handleSignOut = () => {
		logout()
		navigate("/")
	}

	const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

	const handleSearchChange = async e => {
		setSearchTerm(e.target.value)
		if (e.target.value) {
			try {
				const response = await ProductService.searchProductsByName(
					e.target.value
				)
				console.log("Wyniki wyszukiwania:", response.data)
				setSearchResults(response.data)
			} catch (error) {
				console.error("Error fetching search results:", error)
				setSearchResults([])
			}
		} else {
			setSearchResults([])
		}
	}

	const handleSelectResult = productId => {
		navigate(`/product-detail/${productId}`)
	}

	const handleSearchSubmit = e => {
		e.preventDefault()
		if (searchResults.length > 0) {
			handleSelectResult(searchResults[0].id)
		} else {
			navigate(`/ProductsPage?query=${searchTerm}`)
		}
	}


	return (
		<Navbar expand='lg' bg='light' data-bs-theme='light' sticky='top' >
			<Container fluid>
				<Navbar.Brand as={Link} to='/' className='nav-link-hover'>
					<img
						alt=''
						src='/images/home.svg'
						width='30'
						height='30'
						className='d-inline-block align-top '
					/>
					{" Home Page"}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='navbarScroll'/>
				<Navbar.Collapse id='navbarScroll'>
					<Nav
						className='me-auto my-2 my-lg-0'
						style={{ maxHeight: "100px" }}
						navbarScroll>
						<Nav.Link as={Link} to='/ProductsPage' variant='light' className='nav-link-hover'>
							Games
						</Nav.Link>
						<Form
							className='d-flex'
							onSubmit={handleSearchSubmit}
							style={{ position: "relative" }}>
							<Form.Control
								type='search'
								placeholder='Enter product name'
								className='me-2'
								aria-label='Search'
								value={searchTerm}
								onChange={handleSearchChange}
							/>
							{searchTerm && (
								<div
									style={{
										position: "absolute",
										top: "100%",
										left: 0,
										right: 0,
										zIndex: 1000,
									}}>
									<Dropdown.Menu show>
										<Dropdown.Header>Products found</Dropdown.Header>
										{searchResults.length > 0 ? (
											searchResults.map(product => (
												<Dropdown.Item
													key={product.id}
													onClick={() => handleSelectResult(product.id)}>
													{product.name}
												</Dropdown.Item>
											))
										) : (
											<Dropdown.Item disabled>
												The products you are looking for cannot be found
											</Dropdown.Item>
										)}
									</Dropdown.Menu>
								</div>
							)}
						</Form>
					</Nav>
					<Nav className='align-items-center'>
						{currentUser ? (
							<>
								<Dropdown
									align='end'
									className='me-4 '
									onToggle={handleDropdownToggle}>
									<Dropdown.Toggle
										variant={isDropdownOpen ? "danger" : "default"}
										id='dropdown-basic'>
										<img
											src='/images/account_circle.svg'
											alt='User'
											style={{ width: "30px", height: "30px" }}
										/>
									</Dropdown.Toggle>
									<Dropdown.Menu>
                    {currentUser.roles.includes('ROLE_ADMIN') && (
                        <Dropdown.Item
                            className='admin-panel-link'
                            as={Link}
                            to='/adminPanel'>
                            Admin Panel
                        </Dropdown.Item>
                    )}
                    <Dropdown.Item
                        className='account-link'
                        as={Link}
                        to='/user-account'>
                        Account
                    </Dropdown.Item>
                    <Dropdown.Item
                        className='sign-out-link'
                        onClick={handleSignOut}>
                        Sign out
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
								<Nav.Link
									as={Link}
									to='/cart'
									className='d-flex align-items-center cart-icon me-4'>
									<img
										src='/images/shopping_cart.svg'
										alt='Cart'
										style={{
											width: "35px",
											height: "35px",
											filter:
												cartItemCount > 0
													? "invert(58%) sepia(92%) saturate(1500%) hue-rotate(188deg) brightness(95%) contrast(88%)"
													: "none",
										}}
									/>
								</Nav.Link>
							</>
						) : (
							<Nav.Link as={Link} to='/login'>
								Log In
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		
	)
}

export default Navbars
