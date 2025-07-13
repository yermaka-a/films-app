import axios from "axios"
import { config } from "shared/config"

export const httpClient = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    "X-API-KEY": config.X_API_KEY,
    "Content-Type": "application/json",
  },
})


