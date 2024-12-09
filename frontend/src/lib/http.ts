import axios from 'axios'

// Crear instancia de Axios con basePath
const http = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
})

export default http
