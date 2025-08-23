import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true // send cookies
});

export default API;
