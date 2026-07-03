import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Wallpaper, Category } from '@/types'
import * as wallpaperApi from '@/api/wallpaper'
import * as mock from '@/mock/service'

export const useWallpaperStore = defineStore('wallpaper', () => {
  const wallpapers = ref<Wallpaper[]>([])
  const categories = ref<Category[]>([])
  const currentWallpaper = ref<Wallpaper | null>(null)
  const total = ref(0)
  const loading = ref(false)

  async function fetchWallpapers(params: {
    page: number
    pageSize: number
    categoryId?: number
    keyword?: string
  }) {
    loading.value = true
    try {
      const res = await wallpaperApi.getWallpapers(params)
      wallpapers.value = res.list
      total.value = res.total
    } catch {
      const res = await mock.mockGetWallpapers(params)
      wallpapers.value = res.list
      total.value = res.total
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    try {
      categories.value = await wallpaperApi.getCategories()
    } catch {
      categories.value = await mock.mockGetCategories()
    }
  }

  async function fetchDetail(id: number) {
    loading.value = true
    try {
      currentWallpaper.value = await wallpaperApi.getWallpaperDetail(id)
    } catch {
      currentWallpaper.value = await mock.mockGetWallpaperDetail(id)
    } finally {
      loading.value = false
    }
  }

  async function uploadWallpaper(formData: FormData): Promise<Wallpaper> {
    try {
      return await wallpaperApi.uploadWallpaper(formData)
    } catch {
      return mock.mockUploadWallpaper(formData)
    }
  }

  async function deleteWallpaper(id: number) {
    try {
      await wallpaperApi.deleteWallpaper(id)
    } catch {
      await mock.mockDeleteWallpaper(id)
    }
    wallpapers.value = wallpapers.value.filter((w) => w.id !== id)
  }

  async function likeWallpaper(id: number) {
    try {
      await wallpaperApi.likeWallpaper(id)
    } catch {
      await mock.mockLikeWallpaper(id)
    }
    const item = wallpapers.value.find((w) => w.id === id)
    if (item) {
      item.isLiked = !item.isLiked
      item.likes += item.isLiked ? 1 : -1
    }
  }

  return {
    wallpapers,
    categories,
    currentWallpaper,
    total,
    loading,
    fetchWallpapers,
    fetchCategories,
    fetchDetail,
    uploadWallpaper,
    deleteWallpaper,
    likeWallpaper,
  }
})
