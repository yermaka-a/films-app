import axios from "axios"

export const httpClient = axios.create({
  baseURL: "",
  headers: {
    // "X-API-KEY": config.X_API_KEY,
    "Content-Type": "application/json",
  },
})
