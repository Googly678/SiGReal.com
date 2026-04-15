import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

// 统一 API 响应结构
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

const request: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器 — 注入 token
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    try {
      const raw = localStorage.getItem('auth-storage')
      if (raw) {
        const { state } = JSON.parse(raw) as { state: { token: string | null } }
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`
        }
      }
    } catch {
      // ignore parse errors
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器 — 统一错误处理
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data } = response
    if (data.code !== 200 && data.code !== 0) {
      return Promise.reject(new Error(data.message ?? '请求失败'))
    }
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // token 失效，清除本地 auth 并跳转登录
      localStorage.removeItem('auth-storage')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export function get<T>(url: string, params?: Record<string, unknown>, config?: AxiosRequestConfig) {
  return request.get<ApiResponse<T>>(url, { params, ...config })
}

export function post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  return request.post<ApiResponse<T>>(url, data, config)
}

export function put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  return request.put<ApiResponse<T>>(url, data, config)
}

export function del<T>(url: string, config?: AxiosRequestConfig) {
  return request.delete<ApiResponse<T>>(url, config)
}

export default request
