import axios from 'axios';
const baseUrl = '/api/users';

const register = async request => {
    const response = await axios.post(`${baseUrl}/register`, request);
    return response.data;
};

const login = async request => {
    const response = await axios.post(`${baseUrl}/login`, request);
    const { data } = response;

    // Set access token in axios header
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

    // Save user to browser's storage
    localStorage.setItem('user', JSON.stringify(data.user));

    // Save token to browser's storage
    localStorage.setItem('token', JSON.stringify(data.token));
    
    return data;
};

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
};

export default { register, login, logout };