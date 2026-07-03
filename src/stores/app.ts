import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

export const useAppStore = defineStore('app', () => {
  const sidebarCollapsed = ref(false)
  const isDark = ref(false)
  const locale = ref<'zh-CN' | 'en'>('zh-CN')

  const sidebarWidth = computed(() => (sidebarCollapsed.value ? '64px' : '240px'))

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function toggleDark() {
    isDark.value = !isDark.value
    applyTheme()
  }

  function setDark(val: boolean) {
    isDark.value = val
    applyTheme()
  }

  function applyTheme() {
    document.documentElement.classList.toggle('dark', isDark.value)
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  }

  function setLocale(loc: 'zh-CN' | 'en') {
    locale.value = loc
  }

  // Initialize theme from system preference
  function initTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDark(prefersDark)
  }

  return {
    sidebarCollapsed,
    isDark,
    locale,
    sidebarWidth,
    toggleSidebar,
    toggleDark,
    setDark,
    setLocale,
    initTheme,
  }
})
