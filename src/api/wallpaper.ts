import { api } from './request'
import type { Wallpaper, Category, PageResult, DashboardStats } from '@/types'

export function getWallpapers(
  params: { page: number; pageSize: number; categoryId?: number; keyword?: string },
  signal?: AbortSignal
): Promise<PageResult<Wallpaper>> {
  return api.get('/wallpaper/list', params as unknown as Record<string, unknown>, { signal })
}

export function getWallpaperDetail(id: number, signal?: AbortSignal): Promise<Wallpaper> {
  return api.get(`/wallpaper/${id}`, undefined, { signal })
}

export function uploadWallpaper(data: FormData): Promise<Wallpaper> {
  return api.post('/wallpaper/upload', data)
}

export function deleteWallpaper(id: number): Promise<void> {
  return api.delete(`/wallpaper/${id}`)
}

export function likeWallpaper(id: number): Promise<void> {
  return api.post(`/wallpaper/${id}/like`)
}

export function getCategories(signal?: AbortSignal): Promise<Category[]> {
  return api.get('/category/list', undefined, { signal })
}

export function getDashboardStats(signal?: AbortSignal): Promise<DashboardStats> {
  return api.get('/dashboard/stats', undefined, { signal })
}
