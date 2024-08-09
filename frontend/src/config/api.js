import axios from "axios";

export const api = axios.create({
  baseURL: "https://licitabsbserer-a1c309841042.herokuapp.com/app",
  timeout: 15000
})
