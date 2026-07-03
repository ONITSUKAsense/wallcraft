import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserInfo, Role, LoginRequest } from '@/types'
import { getToken, setToken, clearAuth, setUser, getUser } from '@/utils/auth'
import * as userApi from '@/api/user'
import * as mock from '@/mock/service'
import { ROLES, ROLE_WEIGHTS } from '@/utils/roles'

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(getToken())
  const userInfo = ref<UserInfo | null>(getUser() as UserInfo | null)

  const isLoggedIn = computed(() => !!token.value)
  const role = computed<Role | undefined>(() => userInfo.value?.role)
  const isAdmin = computed(() => role.value === ROLES.ADMIN)
  const isEditor = computed(() => role.value === ROLES.EDITOR || role.value === ROLES.ADMIN)
  const username = computed(() => userInfo.value?.username ?? '')

  async function login(credentials: LoginRequest) {
    try {
      const res = await userApi.login(credentials)
      token.value = res.token
      userInfo.value = res.user
      setToken(res.token)
      setUser(res.user)
    } catch {
      const res = await mock.mockLogin(credentials)
      token.value = res.token
      userInfo.value = res.user
      setToken(res.token)
      setUser(res.user)
    }
  }

  function logout() {
    clearAuth()
    token.value = null
    userInfo.value = null
  }

  async function fetchUserInfo() {
    try {
      const info = await userApi.getUserInfo()
      userInfo.value = info
      setUser(info)
    } catch {
      if (token.value) {
        const info = await mock.mockGetUserInfo(token.value)
        userInfo.value = info
        setUser(info)
      } else {
        logout()
      }
    }
  }

  function hasRole(requiredRole: Role): boolean {
    if (!userInfo.value) return false
    return ROLE_WEIGHTS[userInfo.value.role] >= ROLE_WEIGHTS[requiredRole]
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    role,
    isAdmin,
    isEditor,
    username,
    login,
    logout,
    fetchUserInfo,
    hasRole,
  }
})
