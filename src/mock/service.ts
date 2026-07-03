import type { LoginRequest, LoginResponse, UserInfo, Wallpaper, Category, PageResult, DashboardStats } from '@/types'
import { getMockWallpapers, mockCategories, mockDashboardStats } from './data'

/** Simulate network delay */
function delay(ms = 200 + Math.random() * 300): Promise<void> {
  return new Promise(r => setTimeout(r, ms))
}

/** Track wallpaper like state in memory */
const likedSet = new Set<number>()

// ─── Auth ────────────────────────────────────────────
export async function mockLogin(data: LoginRequest): Promise<LoginResponse> {
  await delay()
  if (data.username === 'admin' && data.password === 'admin123') {
    return {
      token: 'mock-token-admin',
      user: {
        id: 1,
        username: 'admin',
        nickname: '管理员',
        email: 'admin@wallpaper.app',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
        role: 'admin',
        createdAt: '2024-01-01',
      },
    }
  }
  return {
    token: 'mock-token-user',
    user: {
      id: 2,
      username: data.username,
      nickname: data.username,
      email: `${data.username}@wallpaper.app`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`,
      role: 'user',
      createdAt: '2024-06-01',
    },
  }
}

// ─── User ────────────────────────────────────────────
export async function mockGetUserInfo(token: string): Promise<UserInfo> {
  await delay()
  if (token.includes('admin')) {
    return {
      id: 1, username: 'admin', nickname: '管理员',
      email: 'admin@wallpaper.app', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
      role: 'admin', createdAt: '2024-01-01',
    }
  }
  return {
    id: 2, username: 'demo', nickname: '演示用户',
    email: 'demo@wallpaper.app', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
    role: 'user', createdAt: '2024-06-01',
  }
}

// ─── Wallpaper ───────────────────────────────────────
let wallpapers = getMockWallpapers()
let nextId = 25

export async function mockGetWallpapers(params: {
  page: number
  pageSize: number
  categoryId?: number
  keyword?: string
}): Promise<PageResult<Wallpaper>> {
  await delay()
  let filtered = wallpapers
  if (params.categoryId) {
    filtered = filtered.filter(w => w.categoryId === params.categoryId)
  }
  if (params.keyword) {
    const kw = params.keyword.toLowerCase()
    filtered = filtered.filter(w =>
      w.title.toLowerCase().includes(kw) ||
      w.tags.some(t => t.toLowerCase().includes(kw))
    )
  }
  const start = (params.page - 1) * params.pageSize
  const list = filtered.slice(start, start + params.pageSize).map(w => ({
    ...w,
    isLiked: likedSet.has(w.id),
    likes: w.likes + (likedSet.has(w.id) ? 1 : 0),
  }))
  return { list, total: filtered.length, page: params.page, pageSize: params.pageSize }
}

export async function mockGetWallpaperDetail(id: number): Promise<Wallpaper> {
  await delay()
  const wp = wallpapers.find(w => w.id === id)
  if (!wp) throw new Error('Wallpaper not found')
  return { ...wp, isLiked: likedSet.has(id), likes: wp.likes + (likedSet.has(id) ? 1 : 0) }
}

export async function mockUploadWallpaper(data: FormData): Promise<Wallpaper> {
  await delay(500)
  const title = data.get('title') as string || '新壁纸'
  const newWp: Wallpaper = {
    id: nextId++,
    title,
    description: data.get('description') as string || '',
    url: `https://picsum.photos/seed/new${nextId}/400/700`,
    thumbnail: `https://picsum.photos/seed/new${nextId}/200/350`,
    categoryId: Number(data.get('categoryId')) || 1,
    categoryName: mockCategories.find(c => c.id === Number(data.get('categoryId')))?.name || '其他',
    tags: [],
    width: 1080, height: 1920,
    downloads: 0, likes: 0, isLiked: false,
    author: '我',
    createdAt: new Date().toISOString().split('T')[0],
  }
  wallpapers = [newWp, ...wallpapers]
  return newWp
}

export async function mockDeleteWallpaper(id: number): Promise<void> {
  await delay()
  wallpapers = wallpapers.filter(w => w.id !== id)
}

export async function mockLikeWallpaper(id: number): Promise<void> {
  await delay(100)
  if (likedSet.has(id)) likedSet.delete(id)
  else likedSet.add(id)
}

// ─── Category ────────────────────────────────────────
export async function mockGetCategories(): Promise<Category[]> {
  await delay()
  return mockCategories
}

// ─── Dashboard ───────────────────────────────────────
export async function mockGetDashboardStats(): Promise<DashboardStats> {
  await delay()
  return mockDashboardStats
}
