import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/products";

const ProductService = {
	getProductById: productId => {
		return axios.get(`${API_URL}/${productId}`)
	},

	getAllProducts: (page, size) => {
		const params = new URLSearchParams({
			page: page || 0,
			size: size || 5,
		})
		return axios.get(`${API_URL}?${params.toString()}`)
	},

	getAllGenres: () => {
		return axios.get(`${API_URL}/genres`)
	},

	getAllPlatforms: () => {
		return axios.get(`${API_URL}/platforms`)
	},

	getProductsByFilter: (platforms, genres, maxPrice, page, size) => {
		const params = new URLSearchParams({
			page: page || 0,
			size: size || 5,
		})

		if (maxPrice) {
			params.append("maxPrice", maxPrice)
		}

		platforms.forEach(platform => params.append("platforms", platform))
		genres.forEach(genre => params.append("genres", genre))

		return axios.get(`${API_URL}/filter`, { params })
	},

	searchProductsByName: (query) => {
        return axios.get(`${API_URL}/search`, { params: { query } });
    },

}

export default ProductService
