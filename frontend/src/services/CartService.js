import axios from 'axios';

const CART_URL = 'http://localhost:8080/api/carts/';

const CartService = {
    fetchCart: async (token) => {
        const response = await axios.get(CART_URL + 'products', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    addToCart: async (productId, quantity, token) => {
        await axios.post(CART_URL + 'add-product', 
            { productId, quantity },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    },

    removeFromCart: async (productId, quantity, token) => {
        await axios.post(CART_URL + 'remove-product', 
            { productId, quantity },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    },

    clearCart: async (token) => {
        await axios.post(CART_URL + 'clear-cart', {}, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
    },

    fetchTotalAmount: async (token) => {
        const response = await axios.get(CART_URL + 'total-amount', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};

export default CartService;
