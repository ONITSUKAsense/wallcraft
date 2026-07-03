import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

export function useTheme() {
  const appStore = useAppStore()

  const isDark = computed(() => appStore.isDark)
  const themeText = computed(() => (isDark.value ? 'common.lightMode' : 'common.darkMode'))
  const themeIcon = computed(() => (isDark.value ? 'Sunny' : 'Moon'))

  function toggle() {
    appStore.toggleDark()
  }

  return {
    isDark,
    themeText,
    themeIcon,
    toggle,
  }
}
