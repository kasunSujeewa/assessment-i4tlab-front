import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
});

export const getTask = async (token: any) => {
  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await api.get('/tasks');
    return response;
  } catch (error) {
    return error.response;
  }
};

export const logout = async (token:any) => {
  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await api.post('/user/logout');
    return response;
  } catch (error) {
    return error.response;
  }
};
