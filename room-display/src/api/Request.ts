import axios, { AxiosResponse } from 'axios'
import { resObj } from './type'

const requests = axios.create({
  baseURL: 'http://localhost:8080/',
  //  请求超时时间
  timeout: 5000,
})

// 请求拦截器
requests.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data)
    const token = localStorage.getItem('token')
    config.headers = {
      'Content-Type': 'application/json',
    }
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default requests
