import axios from 'axios';

const ADMIN_URL = 'http://localhost:8080/api/admin/';

const AdminService = {
    addProduct: async (product, token) => {
        const response = await axios.post(ADMIN_URL + 'products', 
            product, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    },

    updateProduct: async (productId, productDetails, token) => {
        const response = await axios.put(ADMIN_URL + 'products/' + productId, 
            productDetails, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    },

    addGenre: async (genre, token) => {
        const response = await axios.post(ADMIN_URL + 'genres', 
            genre, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    },

    updateGenre: async (genreId, genreDetails, token) => {
        const response = await axios.put(ADMIN_URL + 'genres/' + genreId, 
            genreDetails, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    },

    deleteGenre: async (genreId, token) => {
        const response = await axios.delete(ADMIN_URL + 'genres/' + genreId, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    },

    addPlatform: async (platform, token) => {
        const response = await axios.post(ADMIN_URL + 'platforms', 
            platform, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    },

    updatePlatform: async (platformId, platformDetails, token) => {
        const response = await axios.put(ADMIN_URL + 'platforms/' + platformId, 
            platformDetails, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    },

    deletePlatform: async (platformId, token) => {
        const response = await axios.delete(ADMIN_URL + 'platforms/' + platformId, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    },

};

export default AdminService;
