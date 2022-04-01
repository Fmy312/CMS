import { AxiosRequestConfig, AxiosResponse } from 'axios'
interface FRequestInterceptors<T = AxiosResponse> {
  requestInInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInInterceptorCatch?: (error: any) => any
  responsetInInterceptor?: (res: T) => T
  responseInInterceptorCatch?: (error: any) => any
}

interface FRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: FRequestInterceptors<T>
  showloading?: boolean
}
export { FRequestConfig, FRequestInterceptors }
