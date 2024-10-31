import { API_URL } from '@/config'
import axios from 'axios'

// Crear instancia de Axios con basePath
const http = axios.create({
  baseURL: `${process.env.NODE_ENV === 'production' ? API_URL : ''}/api/v1`,
  withCredentials: true,
  timeout: 5000,
})

export default http
