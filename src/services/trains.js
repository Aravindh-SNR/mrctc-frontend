import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_BACKEND_SERVER}/api/trains`;

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