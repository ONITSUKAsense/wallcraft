<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import ThemeToggle from './ThemeToggle.vue'
import LangToggle from './LangToggle.vue'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()
const appStore = useAppStore()

function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="app-header">
    <div class="header-left">
      <button class="sidebar-toggle" @click="appStore.toggleSidebar()">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      <router-link to="/home" class="logo">
        <img src="/vite.svg" alt="logo" width="28" height="28" />
        <span class="logo-text">Wallpaper</span>
      </router-link>
    </div>

    <div class="header-center">
      <div class="search-box">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" :placeholder="t('home.search')" class="search-input" />
      </div>
    </div>

    <div class="header-right">
      <LangToggle />
      <ThemeToggle />
      <template v-if="userStore.isLoggedIn">
        <router-link to="/admin" class="header-btn" v-if="userStore.isEditor">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
        </router-link>
        <el-dropdown trigger="click" @command="handleLogout">
          <div class="user-avatar">
            <img :src="userStore.userInfo?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'" alt="avatar" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="router.push('/profile')">
                {{ t('nav.profile') }}
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                {{ t('nav.logout') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template v-else>
        <el-button size="small" @click="router.push('/login')">{{ t('nav.login') }}</el-button>
      </template>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 100;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.sidebar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
}
.sidebar-toggle:hover {
  background: var(--bg-hover);
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}
.logo-text {
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(135deg, #6C5CE7, #a29bfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.header-center {
  flex: 1;
  max-width: 480px;
  margin: 0 auto;
}
.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 6px 12px;
  color: var(--text-tertiary);
}
.search-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: var(--text-primary);
}
.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.header-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  color: var(--text-secondary);
  text-decoration: none;
}
.header-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}
.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid var(--border-color);
}
.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
