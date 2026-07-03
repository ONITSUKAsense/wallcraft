import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { getToken, clearAuth } from '@/utils/auth'
import { useUserStore } from '@/stores/user'
import { ROLES_STAFF, ROLES_ADMIN } from '@/utils/roles'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    roles?: string[]
    hidden?: boolean
    requiresAuth?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/pages/login/index.vue'),
        meta: { title: '登录', hidden: true },
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/pages/home/index.vue'),
        meta: { title: '首页', icon: 'House' },
      },
      {
        path: 'wallpaper/:id',
        name: 'WallpaperDetail',
        component: () => import('@/pages/wallpaper/detail.vue'),
        meta: { title: '壁纸详情', hidden: true },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/pages/profile/index.vue'),
        meta: { title: '个人中心', icon: 'User', requiresAuth: true },
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/DefaultLayout.vue'),
    redirect: '/admin/dashboard',
    meta: { title: '管理后台', icon: 'Setting', roles: ROLES_STAFF },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/pages/admin/dashboard.vue'),
        meta: { title: '仪表盘', icon: 'DataAnalysis', roles: ROLES_STAFF },
      },
      {
        path: 'wallpapers',
        name: 'AdminWallpapers',
        component: () => import('@/pages/admin/wallpapers.vue'),
        meta: { title: '壁纸管理', icon: 'Picture', roles: ROLES_STAFF },
      },
      {
        path: 'upload',
        name: 'AdminUpload',
        component: () => import('@/pages/admin/upload.vue'),
        meta: { title: '上传壁纸', icon: 'Upload', roles: ROLES_STAFF },
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/pages/admin/users.vue'),
        meta: { title: '用户管理', icon: 'UserFilled', roles: ROLES_ADMIN },
      },
    ],
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('@/pages/error/403.vue'),
    meta: { title: '无权限', hidden: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/error/404.vue'),
    meta: { title: '页面不存在', hidden: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard - permission control
router.beforeEach(async (to, _from, next) => {
  const token = getToken()
  const requiresAuth = to.meta.requiresAuth !== false && to.name !== 'Login'

  if (to.name === 'Login' && token) {
    return next({ name: 'Home' })
  }

  if (requiresAuth && !token) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  // RBAC check
  const requiredRoles = to.meta.roles as string[] | undefined
  if (requiredRoles && requiredRoles.length > 0) {
    const userStore = useUserStore()

    // Token exists but userInfo not loaded yet (page refresh, etc.)
    if (!userStore.userInfo && token) {
      try {
        await userStore.fetchUserInfo()
      } catch {
        clearAuth()
        return next({ name: 'Login', query: { redirect: to.fullPath } })
      }
    }

    if (!userStore.userInfo) {
      return next({ name: 'Login', query: { redirect: to.fullPath } })
    }

    if (!requiredRoles.includes(userStore.userInfo.role)) {
      return next({ name: 'Forbidden' })
    }
  }

  next()
})

export default router
