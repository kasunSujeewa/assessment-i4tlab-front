import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response;
  } catch (error) {
   
     return error.response;
  }
};

export const register = async (name: string,email: string, password: string,confirm_password: string, role: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {name, email, password,confirm_password, role });
    return response;
  } catch (error) {
    return error.response;
  }
};