import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
});

export const getTask = async (token: any,page: Number) => {
  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await api.get('/tasks?page='+page);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const createTask = async (token: any,data: {title: string, due_date:string}) => {
  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await api.post('/tasks',data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteTask = async (token: any,id : Number) => {
  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await api.delete(`/tasks/${id}`);
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
