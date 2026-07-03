<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const userStore = useUserStore()

const isRegister = ref(false)
const loading = ref(false)
const form = reactive({
  username: 'admin',
  password: 'admin123',
  confirmPassword: '',
  nickname: '',
})

function toggleMode() {
  isRegister.value = !isRegister.value
}

async function handleSubmit() {
  if (loading.value) return
  loading.value = true
  try {
    if (isRegister.value) {
      if (form.password !== form.confirmPassword) {
        ElMessage.warning('密码不一致')
        return
      }
      // Mock register
      ElMessage.success('注册成功，请登录')
      isRegister.value = false
      return
    }

    await userStore.login({
      username: form.username,
      password: form.password,
    })
    ElMessage.success('登录成功')
    const redirect = (route.query.redirect as string) || '/home'
    router.push(redirect)
  } catch (e) {
    ElMessage.error('登录失败: ' + (e as any)?.message || '未知错误')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <h2 class="login-title">{{ isRegister ? t('user.register') : t('user.login') }}</h2>
    <el-form @submit.prevent="handleSubmit" class="login-form">
      <el-form-item :label="t('user.username')">
        <el-input v-model="form.username" :placeholder="t('user.username')" />
      </el-form-item>
      <el-form-item :label="t('user.password')">
        <el-input v-model="form.password" type="password" show-password :placeholder="t('user.password')" />
      </el-form-item>
      <el-form-item v-if="isRegister" :label="t('user.confirmPassword')">
        <el-input v-model="form.confirmPassword" type="password" show-password :placeholder="t('user.confirmPassword')" />
      </el-form-item>
      <el-form-item v-if="isRegister" :label="t('user.nickname')">
        <el-input v-model="form.nickname" :placeholder="t('user.nickname')" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading" class="login-btn">
          {{ isRegister ? t('user.registerBtn') : t('user.loginBtn') }}
        </el-button>
      </el-form-item>
    </el-form>
    <div class="login-footer">
      <span v-if="!isRegister">
        {{ t('user.noAccount') }}
        <a href="#" @click.prevent="toggleMode">{{ t('user.registerBtn') }}</a>
      </span>
      <span v-else>
        {{ t('user.hasAccount') }}
        <a href="#" @click.prevent="toggleMode">{{ t('user.loginBtn') }}</a>
      </span>
    </div>
    <div class="demo-hint">
      演示账号：admin / admin123（管理员）
    </div>
  </div>
</template>

<style scoped>
.login-page {
  padding: 20px 0;
}
.login-title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 24px;
  color: var(--text-primary);
}
.login-form {
  width: 100%;
}
.login-btn {
  width: 100%;
}
.login-footer {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: var(--text-secondary);
}
.login-footer a {
  color: var(--primary);
  text-decoration: none;
}
.demo-hint {
  text-align: center;
  margin-top: 12px;
  padding: 8px 12px;
  background: var(--bg-secondary);
  border-radius: 6px;
  font-size: 12px;
  color: var(--text-tertiary);
}
</style>
