import axios from 'axios';
const baseUrl = '/api/trains';

const getTrains = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const addTrain = async request => {
    const response = await axios.post(baseUrl, request);
    return response.data;
};

const updatePrice = async (id, price) => {
    const response = await axios.put(`${baseUrl}/${id}`, { price });
    return response.data;
};

export default { getTrains, addTrain, updatePrice };