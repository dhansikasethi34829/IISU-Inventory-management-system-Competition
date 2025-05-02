import axios from "axios";

const Instance = axios.create({
    // baseURL: `https://stock-menegement-back.onrender.com`,
    baseURL: "http://localhost:8080/",
    withCredentials:true,
});

export default Instance;
