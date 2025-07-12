class Config {
  BASE_URL = ""
  X_API_KEY = ""
  constructor() {
    this.BASE_URL = import.meta.env.VITE_BASE_URL
    this.X_API_KEY = import.meta.env.VITE_X_API_KEY
  }
}

const config = new Config()
export { config }
