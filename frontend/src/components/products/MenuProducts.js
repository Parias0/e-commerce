import React, { useEffect, useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import ProductService from "../../services/ProductService";

function MenuProducts({ onFilter }) {
	const [genres, setGenres] = useState([])
	const [platforms, setPlatforms] = useState([])
	const [selectedGenres, setSelectedGenres] = useState([])
	const [selectedPlatforms, setSelectedPlatforms] = useState([])
	const [maxPrice, setMaxPrice] = useState(400)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const genresResponse = await ProductService.getAllGenres()
				const platformsResponse = await ProductService.getAllPlatforms()
				setGenres(genresResponse.data)
				setPlatforms(platformsResponse.data)
			} catch (error) {
				console.error("Error fetching genres and platforms:", error)
			}
		}

		fetchData()
	}, [])

	const handleGenreChange = genreName => {
		setSelectedGenres(prevGenres =>
			prevGenres.includes(genreName)
				? prevGenres.filter(name => name !== genreName)
				: [...prevGenres, genreName]
		)
	}

	const handlePlatformChange = platformId => {
		setSelectedPlatforms(prevPlatforms =>
			prevPlatforms.includes(platformId)
				? prevPlatforms.filter(id => id !== platformId)
				: [...prevPlatforms, platformId]
		)
	}

	const handleFilter = () => {
		const genreIds = genres
			.filter(genre => selectedGenres.includes(genre.name))
			.map(genre => genre.id)
		onFilter(genreIds, selectedPlatforms, maxPrice)
	}

	const resetFilters = () => {
		setSelectedGenres([])
		setSelectedPlatforms([])
		setMaxPrice(400) // Reset do domyślnej wartości
		onFilter([], [], 400)
	}

	return (
		<Container className='p-4 border rounded bg-light flex-fill'>
			<Form>
				<Form.Group controlId='genresCheckboxGroup'>
					<Form.Label>
						<strong>Genres</strong>
					</Form.Label>
					{genres.map(genre => (
						<Form.Check
							key={genre.id}
							type='checkbox'
							id={`genre-${genre.id}`}
							label={genre.name}
							onChange={() => handleGenreChange(genre.name)}
							checked={selectedGenres.includes(genre.name)}
						/>
					))}
				</Form.Group>

				<Form.Group controlId='platformsCheckboxGroup' className='my-4'>
					<Form.Label>
						<strong>Platforms</strong>
					</Form.Label>
					{platforms.map(platform => (
						<Form.Check
							key={platform.id}
							type='checkbox'
							id={`platform-${platform.id}`}
							label={platform.name}
							onChange={() => handlePlatformChange(platform.id)}
							checked={selectedPlatforms.includes(platform.id)}
						/>
					))}
				</Form.Group>
				<Form.Group controlId='maxPriceRange'>
					<Form.Label>
						<strong>Max Price: {maxPrice} USD</strong>
					</Form.Label>
					<Form.Range
						min={0}
						max={400}
						value={maxPrice}
						onChange={e => setMaxPrice(e.target.value)}
					/>
				</Form.Group>

				<Form.Group>
					<Button
						variant='outline-info'
						onClick={handleFilter}
						className='me-2'>
						<img src='/images/filter-on.svg' alt='filter-on'></img>
					</Button>
					<Button variant='outline-danger' onClick={resetFilters}>
						<img src='/images/filter-off.svg' alt='filter-off'></img>
					</Button>
				</Form.Group>
			</Form>
		</Container>
	)
}

export default MenuProducts
