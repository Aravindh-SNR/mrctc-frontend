MRCTC - a (dummy) subset of IRCTC for Metropolitan cities of India

To run the app locally, set up the backend from [this repository](https://github.com/Aravindh-SNR/mrctc-backend) and then follow the below steps:

1. Clone the repository
2. Install the dependencies - npm install
3. Start the app by supplying the backend url as an environment variable:

Windows (cmd.exe)   
set "REACT_APP_BACKEND_SERVER=https://mrctc-backend.herokuapp.com" && npm start   

Windows (Powershell)   
($env:REACT_APP_BACKEND_SERVER = "https://mrctc-backend.herokuapp.com") -and (npm start)   

Linux, macOS (Bash)   
REACT_APP_BACKEND_SERVER=https://mrctc-backend.herokuapp.com npm start