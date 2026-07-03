import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, clearAuth } from '@/utils/auth'
import router from '@/router'

const request = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - attach token
request.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - unwrap data & handle errors
request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status
    const msg = error.response?.data?.message || error.message

    switch (status) {
      case 401:
        ElMessage.error('登录已过期，请重新登录')
        clearAuth()
        router.push('/login')
        break
      case 403:
        ElMessage.error('无权限访问')
        break
      case 404:
        ElMessage.error('请求的资源不存在')
        break
      case 500:
        ElMessage.error('服务器错误')
        break
      default:
        ElMessage.error(msg || '网络错误')
    }

    return Promise.reject(error)
  }
)

interface ApiOptions {
  signal?: AbortSignal
  headers?: Record<string, string>
}

/** 类型安全的 API 请求封装（拦截器已自动 unwrap data） */
export const api = {
  get<T = unknown>(url: string, params?: Record<string, unknown>, opts?: ApiOptions): Promise<T> {
    return request.get(url, { params, signal: opts?.signal, headers: opts?.headers }) as Promise<T>
  },
  post<T = unknown>(url: string, data?: unknown, opts?: ApiOptions): Promise<T> {
    return request.post(url, data, { signal: opts?.signal, headers: opts?.headers }) as Promise<T>
  },
  put<T = unknown>(url: string, data?: unknown, opts?: ApiOptions): Promise<T> {
    return request.put(url, data, { signal: opts?.signal, headers: opts?.headers }) as Promise<T>
  },
  delete<T = void>(url: string, opts?: ApiOptions): Promise<T> {
    return request.delete(url, { signal: opts?.signal, headers: opts?.headers }) as Promise<T>
  },
}

export default request
