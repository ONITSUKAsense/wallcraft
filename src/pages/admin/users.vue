<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePermission } from '@/composables/usePermission'

const { t } = useI18n()
const { isAdmin } = usePermission()

const users = ref(
  Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    username: `user${i + 1}`,
    nickname: `用户${i + 1}`,
    email: `user${i + 1}@wallpaper.app`,
    role: i === 0 ? 'admin' as const : i < 3 ? 'editor' as const : 'user' as const,
    status: i === 7 ? false : true,
    createdAt: `2024-0${Math.min(i + 1, 6)}-${String(i + 10).padStart(2, '0')}`,
    wallpapers: [12, 8, 23, 5, 17, 45, 3, 9, 14, 30][i],
  }))
)

const editDialogVisible = ref(false)
const editingUser = ref<any>(null)
const editForm = ref({
  nickname: '',
  email: '',
  role: 'user',
})

function handleEdit(user: any) {
  if (!isAdmin) {
    ElMessage.warning('只有管理员可以编辑用户')
    return
  }
  editingUser.value = user
  editForm.value = { nickname: user.nickname, email: user.email, role: user.role }
  editDialogVisible.value = true
}

function saveEdit() {
  if (editingUser.value) {
    Object.assign(editingUser.value, editForm.value)
  }
  editDialogVisible.value = false
  ElMessage.success(t('common.success'))
}

async function handleDelete(id: number) {
  if (!isAdmin) {
    ElMessage.warning('只有管理员可以删除用户')
    return
  }
  try {
    await ElMessageBox.confirm('确定要删除此用户吗？', '提示', {
      type: 'warning',
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
    })
    users.value = users.value.filter(u => u.id !== id)
    ElMessage.success('已删除')
  } catch {}
}

function toggleStatus(user: any) {
  if (!isAdmin) return
  user.status = !user.status
  ElMessage.success(user.status ? '已启用' : '已禁用')
}
</script>

<template>
  <div class="admin-users">
    <div class="page-header">
      <h2 class="page-title">{{ t('admin.users') }}</h2>
    </div>

    <!-- Statistics -->
    <div class="user-stats">
      <div class="user-stat-card">
        <span class="stat-num">{{ users.length }}</span>
        <span class="stat-lbl">总用户</span>
      </div>
      <div class="user-stat-card">
        <span class="stat-num">{{ users.filter(u => u.role === 'admin').length }}</span>
        <span class="stat-lbl">管理员</span>
      </div>
      <div class="user-stat-card">
        <span class="stat-num">{{ users.filter(u => u.role === 'editor').length }}</span>
        <span class="stat-lbl">编辑</span>
      </div>
      <div class="user-stat-card">
        <span class="stat-num">{{ users.filter(u => u.role === 'user').length }}</span>
        <span class="stat-lbl">普通用户</span>
      </div>
    </div>

    <!-- Users Table -->
    <el-table :data="users" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="username" label="用户名" min-width="120" />
      <el-table-column prop="nickname" label="昵称" width="120" />
      <el-table-column prop="email" label="邮箱" min-width="180" />
      <el-table-column prop="role" label="角色" width="100">
        <template #default="{ row }">
          <el-tag :type="row.role === 'admin' ? 'danger' : row.role === 'editor' ? 'warning' : 'info'" size="small">
            {{ row.role }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-switch v-model="row.status" :disabled="!isAdmin" @change="toggleStatus(row)" />
        </template>
      </el-table-column>
      <el-table-column prop="wallpapers" label="壁纸数" width="100" sortable />
      <el-table-column prop="createdAt" label="注册时间" width="120" />
      <el-table-column label="操作" width="140" fixed="right">
        <template #default="{ row }">
          <el-button size="small" @click="handleEdit(row)">{{ t('common.edit') }}</el-button>
          <el-button size="small" type="danger" :disabled="!isAdmin" @click="handleDelete(row.id)">
            {{ t('common.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Edit Dialog -->
    <el-dialog v-model="editDialogVisible" title="编辑用户" width="400px">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="editForm.nickname" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="editForm.role">
            <el-option label="普通用户" value="user" />
            <el-option label="编辑" value="editor" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDialogVisible = false">{{ t('common.cancel') }}</el-button>
        <el-button type="primary" @click="saveEdit">{{ t('common.confirm') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.page-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
}
.user-stats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}
.user-stat-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.stat-num {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary);
}
.stat-lbl {
  font-size: 13px;
  color: var(--text-tertiary);
}
</style>
