import axios from "axios";

const Axios = axios.create({
    baseURL:"http://localhost:6105",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://10.4.31.98:5174', // Replace with your client's origin
    },
});

export default Axios;