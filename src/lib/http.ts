import { API_URL } from '@/config'
import axios from 'axios'

// Crear instancia de Axios con basePath
const http = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer tu-token',
  },
})

export default http
