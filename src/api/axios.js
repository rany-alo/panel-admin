import axios from "axios";

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

export const getJwtToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
    delete axios.defaults.headers.common['Authorization'];
    window.alert('Vous devez être connecté pour accéder à cette page');  
    window.location.href = '/';
    }
}