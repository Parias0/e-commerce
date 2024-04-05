import React, { useState, useEffect } from "react";
import MenuProducts from "../components/products/MenuProducts";
import FilteredProducts from "../components/products/FilteredProducts";
import ProductService from "../services/ProductService";
import {
	Col,
	Row,
	Container,
	Pagination,
	Offcanvas,
	Button,
} from "react-bootstrap"
import Navbars from "../components/Navbars"

function ProductsPage() {
	const [products, setProducts] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [activeFilters, setActiveFilters] = useState({
		genres: [],
		platforms: [],
		maxPrice: null,
	})

	const [show, setShow] = useState(false)

	const handleShow = () => setShow(true)
	const handleClose = () => setShow(false)

	const fetchFilteredProducts = (page, genres, platforms, maxPrice) => {
		ProductService.getProductsByFilter(platforms, genres, maxPrice, page)
			.then(response => {
				setProducts(response.data.content)
				setTotalPages(response.data.totalPages)
			})
			.catch(error => console.error("Error filtering products:", error))
	}

	useEffect(() => {
		const { genres, platforms, maxPrice } = activeFilters
		if (genres.length === 0 && platforms.length === 0 && maxPrice === null) {
			ProductService.getAllProducts(currentPage - 1)
				.then(response => {
					setProducts(response.data.content)
					setTotalPages(response.data.totalPages)
				})
				.catch(error => console.error("Error fetching products:", error))
		} else {
			fetchFilteredProducts(
				currentPage - 1,
				activeFilters.genres,
				activeFilters.platforms,
				activeFilters.maxPrice
			)
		}
	}, [currentPage, activeFilters])

	const handleFilter = (
		selectedGenreIds,
		selectedPlatformIds,
		selectedMaxPrice
	) => {
		setActiveFilters({
			genres: selectedGenreIds,
			platforms: selectedPlatformIds,
			maxPrice: selectedMaxPrice,
		})
		setCurrentPage(1)
		fetchFilteredProducts(
			0,
			selectedGenreIds,
			selectedPlatformIds,
			selectedMaxPrice
		)
	}

	const handlePageChange = pageNumber => {
		setCurrentPage(pageNumber)
	}

	const paginationItems = []
	for (let number = 1; number <= totalPages; number++) {
		paginationItems.push(
			<Pagination.Item
				key={number}
				active={number === currentPage}
				onClick={() => handlePageChange(number)}>
				{number}
			</Pagination.Item>
		)
	}

	return (
		<div>
			<Navbars />
			<Button
				variant='outline-dark'
				onClick={handleShow}
				className='d-md-none my-2'>
				<img src='/images/filter.svg' alt='filter'></img>
			</Button>
			<Offcanvas show={show} onHide={handleClose} placement='start'>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Filters</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<MenuProducts onFilter={handleFilter} />
				</Offcanvas.Body>
			</Offcanvas>
			<div className='d-flex flex-column min-vh-100 bg-dark'>
				<Container className='p-4 flex-fill border-2 flex-fill min-vh-100 bg-light'>
					<Row className='align-items-start'>
						<Col md={2} className='d-none d-md-block'>
							<MenuProducts onFilter={handleFilter} />
						</Col>
						<Col md={10}>
							<FilteredProducts products={products} />
						</Col>
					</Row>
					<Row>
						<Col className='d-flex justify-content-center'>
							<Pagination>{paginationItems}</Pagination>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	)
}

export default ProductsPage
