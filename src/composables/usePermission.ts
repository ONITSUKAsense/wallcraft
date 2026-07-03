import { useUserStore } from '@/stores/user'
import type { Role } from '@/types'

export function usePermission() {
  const userStore = useUserStore()

  function checkRole(requiredRole: Role): boolean {
    return userStore.hasRole(requiredRole)
  }

  function checkRoles(requiredRoles: Role[]): boolean {
    return requiredRoles.some((r) => userStore.hasRole(r))
  }

  function canEdit(): boolean {
    return userStore.hasRole('editor')
  }

  return {
    isAdmin: userStore.isAdmin,
    isEditor: userStore.isEditor,
    role: userStore.role,
    checkRole,
    checkRoles,
    canEdit,
  }
}
