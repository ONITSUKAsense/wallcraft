<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import { marked } from 'marked'

const { t } = useI18n()
const userStore = useUserStore()

const profileForm = reactive({
  nickname: userStore.userInfo?.nickname || '',
  email: userStore.userInfo?.email || '',
})

const bio = ref('## 关于我\n\n热爱摄影和设计，喜欢收集各种精美壁纸。\n\n### 我的兴趣\n- 风景摄影\n- 平面设计\n- 前端开发')

const bioHtml = ref('')

onMounted(() => {
  bioHtml.value = marked(bio.value) as string
})

function saveProfile() {
  ElMessage.success(t('common.success'))
}

function handleAvatarChange() {
  ElMessage.success('头像已更新')
}
</script>

<template>
  <div class="profile-page">
    <div class="profile-header">
      <div class="avatar-section">
        <div class="avatar-wrapper">
          <img :src="userStore.userInfo?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'" alt="avatar" />
          <div class="avatar-overlay" @click="handleAvatarChange">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" stroke-width="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </div>
        </div>
        <div>
          <h2 class="profile-name">{{ userStore.userInfo?.nickname || userStore.username }}</h2>
          <p class="profile-role">角色: {{ userStore.userInfo?.role }}</p>
        </div>
      </div>
    </div>

    <div class="profile-body">
      <div class="profile-card">
        <h3 class="card-title">{{ t('user.profile') }}</h3>
        <el-form :model="profileForm" label-width="100px">
          <el-form-item :label="t('user.nickname')">
            <el-input v-model="profileForm.nickname" />
          </el-form-item>
          <el-form-item :label="t('user.email')">
            <el-input v-model="profileForm.email" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveProfile">{{ t('user.save') }}</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="profile-card">
        <h3 class="card-title">个人简介 (Markdown)</h3>
        <MarkdownEditor v-model="bio" />
      </div>

      <div class="profile-card">
        <h3 class="card-title">预览</h3>
        <div class="bio-preview markdown-body" v-html="bioHtml"></div>
      </div>

      <div class="profile-card">
        <h3 class="card-title">我的收藏</h3>
        <div class="empty-state">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <p>{{ t('common.noData') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  max-width: 800px;
  margin: 0 auto;
}
.profile-header {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  border: 1px solid var(--border-color);
}
.avatar-section {
  display: flex;
  align-items: center;
  gap: 24px;
}
.avatar-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}
.avatar-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.avatar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}
.avatar-wrapper:hover .avatar-overlay {
  opacity: 1;
}
.profile-name {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
}
.profile-role {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 4px;
  text-transform: capitalize;
}
.profile-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.profile-card {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border-color);
}
.card-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-primary);
}
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 40px;
  color: var(--text-tertiary);
}
.bio-preview {
  min-height: 100px;
}
</style>
