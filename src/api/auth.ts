import axios from 'axios';
const BASE_URL = 'http://localhost:8000/v1/api/';

const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';
