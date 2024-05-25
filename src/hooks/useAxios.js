import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.PROD
    ? ""
    : "http://localhost:3000",
});

export default axiosPublic;
