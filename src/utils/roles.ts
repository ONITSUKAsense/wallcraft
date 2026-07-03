import type { Role } from '@/types'

export const ROLES = {
  ADMIN: 'admin' as Role,
  EDITOR: 'editor' as Role,
  USER: 'user' as Role,
} as const

export const ROLE_LABELS: Record<Role, string> = {
  admin: '管理员',
  editor: '编辑',
  user: '普通用户',
}

export const ROLE_WEIGHTS: Record<Role, number> = {
  admin: 3,
  editor: 2,
  user: 1,
}

/** 路由元信息中需要的角色 */
export const ROLES_ADMIN = [ROLES.ADMIN]
export const ROLES_STAFF = [ROLES.ADMIN, ROLES.EDITOR]
export const ROLES_ALL = [ROLES.ADMIN, ROLES.EDITOR, ROLES.USER]
