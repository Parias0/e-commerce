import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const register = (username, email, password) => {
  return axios.post(API_URL + 'signup', {
    username,
    email,
    password
  });
};

const login = (username, password) => {
  return axios.post(API_URL + 'signin', {
    username,
    password
  })
  .then((response) => {
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log(response.data);
    }
    return response.data;
  });
};

const logout = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    console.log('Logging out, token info:', user.token);
  } else {
    console.log('No token found, logging out');
  }

  localStorage.removeItem('user');
  alert('You have been successfully logged out.');
};

const requestPasswordReset = (email) => {
  return axios.post(API_URL + 'request-password-reset', null, {
    params: { email }
  });
};

const resetPassword = (token, newPassword) => {
  return axios.post(API_URL + 'reset-password', null, {
    params: {
      token,
      newPassword
    }
  });
};



const authService = {
  register,
  login,
  logout,
  requestPasswordReset,
  resetPassword,
};

export default authService;

