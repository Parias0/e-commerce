import axios from 'axios';

const API_URL = 'http://localhost:8080/api/favorites';

const FavoriteService = {
  toggleFavorite: (productId, token) => {
    return axios.post(`${API_URL}/toggle?productId=${productId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  getFavorites: (token) => {
    return axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

export default FavoriteService;
