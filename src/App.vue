<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

onMounted(() => {
  // Initialize theme from system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  appStore.setDark(prefersDark)
})
</script>

<template>
  <router-view />
</template>

<style>
#app {
  min-height: 100vh;
}
</style>
