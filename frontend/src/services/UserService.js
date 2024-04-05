import axios from 'axios';

const API_URL = 'http://localhost:8080/api/account/';

const UserService = {
  getUserInfo: (token) => {
    return axios.get(API_URL + 'info', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  updateUserInfo: (userData, token) => {
    return axios.put(API_URL + 'update', userData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  changePassword: (passwordData, token) => {
    return axios.put(API_URL + 'change-password', passwordData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
};

export default UserService;
