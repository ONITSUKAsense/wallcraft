// User roles
export type Role = 'admin' | 'editor' | 'user'

// User info
export interface UserInfo {
  id: number
  username: string
  nickname: string
  email: string
  avatar: string
  role: Role
  createdAt: string
}

// Login request
export interface LoginRequest {
  username: string
  password: string
}

// Login response
export interface LoginResponse {
  token: string
  user: UserInfo
}

// Wallpaper category
export interface Category {
  id: number
  name: string
  icon: string
  count: number
}

// Wallpaper item
export interface Wallpaper {
  id: number
  title: string
  description: string
  url: string
  thumbnail: string
  categoryId: number
  categoryName: string
  tags: string[]
  width: number
  height: number
  downloads: number
  likes: number
  isLiked: boolean
  author: string
  createdAt: string
}

// Wallpaper upload
export interface WallpaperUpload {
  title: string
  description: string
  categoryId: number
  tags: string[]
  file: File
}

// Pagination
export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// Dashboard stats
export interface DashboardStats {
  totalWallpapers: number
  totalUsers: number
  totalDownloads: number
  todayUploads: number
  categoryDistribution: { name: string; value: number }[]
  weeklyDownloads: { day: string; count: number }[]
}

// Route meta
export interface RouteMeta {
  title?: string
  icon?: string
  roles?: Role[]
  hidden?: boolean
  requiresAuth?: boolean
}
