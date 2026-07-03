<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isAdminPage = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <div class="layout" :class="{ 'layout-admin': isAdminPage }">
    <AppHeader />
    <div class="layout-body">
      <AppSidebar />
      <main class="layout-main">
        <div class="layout-content">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-secondary);
}
.layout-body {
  display: flex;
  flex: 1;
}
.layout-main {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}
.layout-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
}
.layout-admin .layout-content {
  max-width: none;
}
</style>
