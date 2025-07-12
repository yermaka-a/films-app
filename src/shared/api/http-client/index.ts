import axios from "axios"
import { config } from "shared/config"

export const httpClient = axios.create({
  baseURL: config.BASE_URL,
  // timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
  // headers: {
  //   "X-API-KEY": config.X_API_KEY,
  //   "Content-Type": "application/json",
  // },
})
