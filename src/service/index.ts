import Frequest from './request/request'
import { BASE_URL, Time_OUT } from './request/config'
import localeCache from '@/utils/cache'

const FRquest = new Frequest({
  baseURL: BASE_URL,
  timeout: Time_OUT,
  showloading: true,
  interceptors: {
    requestInInterceptor: (config) => {
      const token = localeCache.getCache('token') ?? ''
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },

    requestInInterceptorCatch: (err) => err,

    responsetInInterceptor: (res) => {
      return res
    },

    responseInInterceptorCatch: (err) => err
  }
})
export { FRquest }
