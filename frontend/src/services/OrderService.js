import axios from 'axios';

const API_URL = 'http://localhost:8080/api/orders/';

const createOrder = (orderData) => {
  console.log("Sending Order Data to Backend:", orderData);
  const user = JSON.parse(localStorage.getItem('user')); // Pobierz obiekt user z localStorage
  const token = user?.token; // Pobierz token z obiektu user

  return axios.post(API_URL + 'create', orderData, {
    headers: {
      Authorization: `Bearer ${token}` // Dołącz token do nagłówka żądania
    }
  });
};

const getUserOrders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  return axios.get(API_URL + 'all', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const OrderService = {
  createOrder,
  getUserOrders,
};

export default OrderService;
