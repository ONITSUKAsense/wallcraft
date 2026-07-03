import type { Role } from '@/types'

/** 权限层级: admin > editor > user */
const roleWeight: Record<Role, number> = {
  admin: 3,
  editor: 2,
  user: 1,
}

/** 判断角色是否满足最低要求 */
export function hasRole(userRole: Role | undefined, requiredRole: Role): boolean {
  if (!userRole) return false
  return roleWeight[userRole] >= roleWeight[requiredRole]
}

/** 判断角色是否在允许列表中 */
export function hasAnyRole(userRole: Role | undefined, allowedRoles: Role[]): boolean {
  if (!userRole) return false
  return allowedRoles.includes(userRole)
}

/** 判断是否为管理员 */
export function isAdmin(userRole: Role | undefined): boolean {
  return userRole === 'admin'
}
