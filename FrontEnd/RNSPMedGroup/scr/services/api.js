import axios from "axios";

const api = axios.create({
  baseURL: "https://spmedgroup-api.azurewebsites.net/api"
});

export default api;