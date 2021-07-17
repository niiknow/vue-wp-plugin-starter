import axios, { AxiosInstance, AxiosResponse } from 'axios'

const Axios: AxiosInstance = axios.create({
  baseURL: '/',
  withCredentials: false,
  headers: {
    'Accept': 'application/json; charset=utf-8',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

/* Allows Us To Authorized Api Request If Authenticated Using Web Middleware */
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

Axios.interceptors.response.use((response: AxiosResponse) => {
  // replace old nonce
  if (response.headers['X-WP-Nonce']) {
    window.$appConfig.nonce = response.headers['X-WP-Nonce']
  }

  return response
})

Axios.interceptors.request.use((config: any) => {

  // set nonce
  config.headers['X-WP-Nonce'] = window.$appConfig.nonce

  return config
})

export default Axios
