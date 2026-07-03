<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const { t } = useI18n()
const appStore = useAppStore()
const userStore = useUserStore()

type IconName = 'home' | 'profile' | 'dashboard' | 'picture' | 'upload' | 'users'

interface MenuItem {
  path: string
  name: string
  icon: IconName
}

const sidebarMenus = computed<MenuItem[]>(() => {
  const items: MenuItem[] = [
    { path: '/home', name: t('nav.home'), icon: 'home' },
  ]
  if (userStore.isLoggedIn) {
    items.push({ path: '/profile', name: t('nav.profile'), icon: 'profile' })
  }
  if (userStore.isEditor) {
    items.push(
      { path: '/admin/dashboard', name: t('admin.dashboard'), icon: 'dashboard' },
      { path: '/admin/wallpapers', name: t('admin.wallpapers'), icon: 'picture' },
      { path: '/admin/upload', name: t('admin.upload'), icon: 'upload' },
    )
  }
  if (userStore.isAdmin) {
    items.push({ path: '/admin/users', name: t('admin.users'), icon: 'users' })
  }
  return items
})

const collapsed = computed(() => appStore.sidebarCollapsed)
</script>

<template>
  <aside class="sidebar" :class="{ collapsed }">
    <nav class="sidebar-nav">
      <router-link
        v-for="item in sidebarMenus"
        :key="item.path"
        :to="item.path"
        class="sidebar-item"
        :class="{ active: route.path.startsWith(item.path) }"
      >
        <span class="sidebar-icon">
          <!-- home -->
          <svg v-if="item.icon === 'home'" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <!-- profile -->
          <svg v-else-if="item.icon === 'profile'" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          <!-- dashboard -->
          <svg v-else-if="item.icon === 'dashboard'" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
          <!-- picture -->
          <svg v-else-if="item.icon === 'picture'" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
          </svg>
          <!-- upload -->
          <svg v-else-if="item.icon === 'upload'" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <!-- users -->
          <svg v-else-if="item.icon === 'users'" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </span>
        <span class="sidebar-label" v-show="!collapsed">{{ item.name }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-width, 240px);
  height: calc(100vh - 60px);
  background: var(--bg-primary);
  border-right: 1px solid var(--border-color);
  transition: width 0.3s;
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 0;
}
.sidebar.collapsed {
  width: 64px;
}
.sidebar-nav {
  padding: 12px 8px;
}
.sidebar-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 2px;
  transition: all 0.2s;
  white-space: nowrap;
}
.sidebar-item:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}
.sidebar-item.active {
  background: var(--primary-bg);
  color: var(--primary);
  font-weight: 600;
}
.sidebar-icon {
  flex-shrink: 0;
  width: 24px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sidebar-label {
  overflow: hidden;
}
</style>
