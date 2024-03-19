import axios from "axios";

// Set config defaults when creating the instance
const myaxios = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default myaxios
