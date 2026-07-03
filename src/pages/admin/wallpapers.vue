<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePermission } from '@/composables/usePermission'
import { getMockWallpapers } from '@/mock/data'

const router = useRouter()
const { t } = useI18n()
const { isAdmin } = usePermission()

const searchQuery = ref('')
const selectedCategory = ref('')
const raw = getMockWallpapers()
const wallpapers = ref(
  raw.slice(0, 12).map(w => ({
    id: w.id,
    title: w.title,
    category: w.categoryName,
    tags: w.tags,
    resolution: `${w.width}x${w.height}`,
    author: w.author,
    downloads: w.downloads,
    status: (w.id % 5 === 0 ? 'pending' : 'published') as 'published' | 'pending',
    createdAt: w.createdAt,
  }))
)

const categories = [
  { value: '', label: '全部分类' },
  { value: '风景', label: '风景' },
  { value: '抽象', label: '抽象' },
  { value: '动物', label: '动物' },
  { value: '科技', label: '科技' },
  { value: '动漫', label: '动漫' },
]

async function handleDelete(id: number) {
  try {
    await ElMessageBox.confirm('确定要删除这张壁纸吗？', '提示', { type: 'warning' })
    wallpapers.value = wallpapers.value.filter(w => w.id !== id)
    ElMessage.success('删除成功')
  } catch {}
}

function handleEdit(id: number) {
  router.push(`/wallpaper/${id}`)
}
</script>

<template>
  <div class="admin-wallpapers">
    <div class="page-header">
      <h2 class="page-title">{{ t('admin.wallpapers') }}</h2>
      <el-button type="primary" @click="router.push('/admin/upload')">{{ t('admin.upload') }}</el-button>
    </div>

    <!-- Filters -->
    <div class="filters">
      <el-input v-model="searchQuery" :placeholder="t('common.search')" style="width: 240px" clearable />
      <el-select v-model="selectedCategory" :placeholder="t('wallpaper.category')" style="width: 140px">
        <el-option v-for="cat in categories" :key="cat.value" :label="cat.label" :value="cat.value" />
      </el-select>
      <el-button>{{ t('common.search') }}</el-button>
      <el-button>{{ t('common.reset') }}</el-button>
    </div>

    <!-- Table -->
    <el-table :data="wallpapers" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="title" label="标题" min-width="180" />
      <el-table-column prop="category" label="分类" width="100" />
      <el-table-column label="标签" width="120">
        <template #default="{ row }">
          <el-tag v-for="tag in row.tags" :key="tag" size="small" style="margin-right: 4px">{{ tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="resolution" label="分辨率" width="120" />
      <el-table-column prop="author" label="上传者" width="120" />
      <el-table-column prop="downloads" label="下载量" width="100" sortable />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 'published' ? 'success' : 'warning'" size="small">
            {{ row.status === 'published' ? '已发布' : '审核中' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="日期" width="120" />
      <el-table-column label="操作" width="160" fixed="right">
        <template #default="{ row }">
          <el-button size="small" @click="handleEdit(row.id)">{{ t('common.edit') }}</el-button>
          <el-button size="small" type="danger" :disabled="!isAdmin" @click="handleDelete(row.id)">
            {{ t('common.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Pagination -->
    <div class="pagination-wrap">
      <el-pagination background layout="prev, pager, next" :total="wallpapers.length * 5" />
    </div>
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
.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.pagination-wrap {
  display: flex;
  justify-content: center;
  padding: 24px 0;
}
</style>
