MRCTC - a (dummy) subset of IRCTC for Metropolitan cities of India

To run the app locally, set up the backend from [this repository](https://github.com/Aravindh-SNR/mrctc) and then follow the below steps:

1. Clone the repository
2. Install the dependencies - npm install
3. Ensure that the proxy in package.json has the correct url of the backend server, for example, if your backend is running at port 3001, the proxy should be http://localhost:3001
4. Start the app - npm start