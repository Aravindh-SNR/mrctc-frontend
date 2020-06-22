Front end of MRCTC - a (dummy) subset of IRCTC for Metropolitan cities of India, built using React.

Check out the live app at https://mrctc.netlify.app/

1. Anyone can view a list of trains
2. Registered customers can buy tickets by adding passengers, and cancel tickets
3. Registered admins can add trains and update the price of train tickets

To register as an admin in the live app, use the passcode: admin@mrctc

To run the app locally, set up the backend from [this repository](https://github.com/Aravindh-SNR/mrctc-backend) and then follow the below steps:

1. Clone the repository
2. Install the dependencies: npm install
3. Start the app by supplying the backend url as an environment variable. For example, if you are running the backend on your machine at port 3001:

Windows (cmd.exe)   
set "REACT_APP_BACKEND_SERVER=http://localhost:3001" && npm start   

Windows (Powershell)   
($env:REACT_APP_BACKEND_SERVER = "http://localhost:3001") -and (npm start)   

Linux, macOS (Bash)   
REACT_APP_BACKEND_SERVER=http://localhost:3001 npm start