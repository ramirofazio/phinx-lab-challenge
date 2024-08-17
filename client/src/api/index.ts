import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;

export const ApiRoutes = {
  getAllPokemon: "/pokemon/all",
  battle: "/battle",
};
