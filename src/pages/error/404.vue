<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="error-page">
    <h1 class="error-code">404</h1>
    <p class="error-message">页面不存在或已被移除</p>
    <el-button type="primary" @click="router.push('/home')">返回首页</el-button>
  </div>
</template>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}
.error-code {
  font-size: 120px;
  font-weight: 800;
  background: linear-gradient(135deg, #6C5CE7, #a29bfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 16px;
}
.error-message {
  font-size: 18px;
  color: var(--text-secondary);
  margin-bottom: 24px;
}
</style>
