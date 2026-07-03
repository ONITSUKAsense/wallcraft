<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'

const { locale } = useI18n()
const appStore = useAppStore()

function toggleLang() {
  const next = locale.value === 'zh-CN' ? 'en' : 'zh-CN'
  locale.value = next
  appStore.setLocale(next)
}
</script>

<template>
  <button class="lang-toggle" :title="locale === 'zh-CN' ? 'English' : '中文'" @click="toggleLang">
    {{ locale === 'zh-CN' ? 'EN' : '中' }}
  </button>
</template>

<style scoped>
.lang-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s;
}
.lang-toggle:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}
</style>
