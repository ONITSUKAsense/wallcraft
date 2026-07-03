<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import ThemeToggle from '@/components/ThemeToggle.vue'
import LangToggle from '@/components/LangToggle.vue'
</script>

<template>
  <div class="auth-layout">
    <div class="auth-header">
      <router-link to="/home" class="auth-logo">
        <img src="/vite.svg" alt="logo" width="32" height="32" />
        <span>Wallpaper</span>
      </router-link>
      <div class="auth-actions">
        <LangToggle />
        <ThemeToggle />
      </div>
    </div>
    <div class="auth-body">
      <div class="auth-card">
        <router-view />
      </div>
      <div class="auth-info">
        <h1 class="auth-title">精美壁纸</h1>
        <p class="auth-subtitle">探索无限创意，装点你的屏幕</p>
        <div class="auth-decoration">
          <div class="deco-circle c1"></div>
          <div class="deco-circle c2"></div>
          <div class="deco-circle c3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
}
.auth-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
}
.auth-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
}
.auth-actions {
  display: flex;
  gap: 8px;
}
.auth-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  padding: 40px 32px;
}
.auth-card {
  width: 400px;
  flex-shrink: 0;
}
.auth-info {
  text-align: center;
  position: relative;
}
.auth-title {
  font-size: 48px;
  font-weight: 800;
  background: linear-gradient(135deg, #6C5CE7, #a29bfe, #fd79a8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
}
.auth-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
}
.auth-decoration {
  position: relative;
  width: 300px;
  height: 300px;
  margin-top: 40px;
}
.deco-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
}
.c1 {
  width: 200px;
  height: 200px;
  background: #6C5CE7;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: float 6s ease-in-out infinite;
}
.c2 {
  width: 150px;
  height: 150px;
  background: #fd79a8;
  bottom: 0;
  left: 0;
  animation: float 8s ease-in-out infinite 1s;
}
.c3 {
  width: 120px;
  height: 120px;
  background: #00cec9;
  bottom: 20px;
  right: 0;
  animation: float 7s ease-in-out infinite 2s;
}
@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}
@media (max-width: 768px) {
  .auth-info { display: none; }
  .auth-card { width: 100%; max-width: 400px; }
}
</style>
