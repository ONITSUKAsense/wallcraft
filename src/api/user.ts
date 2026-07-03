import { api } from './request'
import type { LoginRequest, LoginResponse, UserInfo } from '@/types'

export function login(data: LoginRequest): Promise<LoginResponse> {
  return api.post('/auth/login', data)
}

export function logout(): Promise<void> {
  return api.post('/auth/logout')
}

export function getUserInfo(signal?: AbortSignal): Promise<UserInfo> {
  return api.get('/user/info', undefined, { signal })
}

export function getUsers(params: { page: number; pageSize: number }, signal?: AbortSignal) {
  return api.get<{ list: UserInfo[]; total: number }>('/user/list', params as unknown as Record<string, unknown>, { signal })
}

export function updateUser(id: number, data: Partial<UserInfo>): Promise<void> {
  return api.put(`/user/${id}`, data)
}

export function deleteUser(id: number): Promise<void> {
  return api.delete(`/user/${id}`)
}
