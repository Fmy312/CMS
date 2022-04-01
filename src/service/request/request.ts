import axios, { AxiosInstance } from 'axios'
import { FRequestConfig, FRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
import 'element-plus/es/components/loading/style/css'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

class Frequest {
  instance: AxiosInstance
  interceptors?: FRequestInterceptors
  loading?: LoadingInstance
  showloading?: boolean

  constructor(config: FRequestConfig) {
    this.instance = axios.create(config)
    this.showloading = config.showloading || true
    this.interceptors = config.interceptors
    /* 这添加的实例的拦截器 请求拦截器，后添加的先执行，响应拦截器，先添加的先执行*/
    this.instance.interceptors.request.use(
      this.interceptors?.requestInInterceptor,
      this.interceptors?.requestInInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responsetInInterceptor,
      this.interceptors?.responseInInterceptorCatch
    )
    /* 这添加的全局拦截器，只要是实例就有 */
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showloading) {
          this.loading = ElLoading.service({
            text: '正在请求数据...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => err
    ),
      this.instance.interceptors.response.use(
        (res) => {
          const data = res.data
          this.loading?.close()
          if (data?.returnCode == '-1001') {
            console.log('请求失败')
          } else {
            return data
          }
        },
        (err) => {
          this.loading?.close()
          if (err.response.status == 404) {
            console.log('出现404错误')
          }
          return err
        }
      )
  }

  request<T>(config: FRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      /* 单个请求对数据的处理 */
      if (config?.interceptors?.requestInInterceptor) {
        config = config.interceptors.requestInInterceptor(config)
      }
      const flag = this.showloading
      /* 单个请求对是否loading的处理 */
      if (
        config.showloading != null &&
        config.showloading != this.showloading
      ) {
        this.showloading = config.showloading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config?.interceptors?.responsetInInterceptor) {
            res = config.interceptors.responsetInInterceptor(res)
          }
          /* 不能让此次请求影响下次请求 */
          this.showloading = flag
          resolve(res)
        })
        .catch((err) => {
          this.showloading = flag
          reject(err)
        })
    })
  }
  get<T>(config: FRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'get' })
  }
  post<T>(config: FRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: FRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: FRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default Frequest
