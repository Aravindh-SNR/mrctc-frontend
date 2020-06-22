import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_BACKEND_SERVER}/api/tickets`;

const getBookingHistory = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const addToCart = async request => {
    const response = await axios.post(baseUrl, request);
    return response.data;
};

const buyTicket = async id => {
    const response = await axios.put(`${baseUrl}/${id}`);
    return response.data;
};

const cancelTicket = async id => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
};

export default { getBookingHistory, addToCart, buyTicket, cancelTicket };