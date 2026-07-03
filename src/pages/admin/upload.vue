<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import FileUpload from '@/components/FileUpload.vue'

const { t } = useI18n()
const router = useRouter()

const form = reactive({
  title: '',
  description: '',
  categoryId: null as number | null,
  tags: [] as string[],
})
const selectedFile = ref<File | null>(null)
const uploading = ref(false)
const tagInput = ref('')

const categories = [
  { id: 1, name: '风景' },
  { id: 2, name: '抽象' },
  { id: 3, name: '动物' },
  { id: 4, name: '科技' },
  { id: 5, name: '动漫' },
]

function onFileChange(file: File | null) {
  selectedFile.value = file
}

function addTag() {
  const tag = tagInput.value.trim()
  if (tag && !form.tags.includes(tag)) {
    form.tags.push(tag)
    tagInput.value = ''
  }
}

function removeTag(tag: string) {
  form.tags = form.tags.filter(t => t !== tag)
}

async function handleUpload() {
  if (!selectedFile.value) {
    ElMessage.warning('请选择文件')
    return
  }
  if (!form.title) {
    ElMessage.warning('请输入标题')
    return
  }

  uploading.value = true
  try {
    // Mock upload
    await new Promise(resolve => setTimeout(resolve, 1500))
    ElMessage.success(t('upload.success'))
    router.push('/admin/wallpapers')
  } finally {
    uploading.value = false
  }
}
</script>

<template>
  <div class="upload-page">
    <h2 class="page-title">{{ t('admin.upload') }}</h2>

    <div class="upload-layout">
      <div class="upload-main">
        <div class="form-card">
          <el-form :model="form" label-position="top">
            <el-form-item :label="t('upload.title')" required>
              <el-input v-model="form.title" placeholder="请输入壁纸标题" />
            </el-form-item>
            <el-form-item :label="t('upload.description')">
              <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请输入壁纸描述" />
            </el-form-item>
            <el-form-item :label="t('upload.category')" required>
              <el-select v-model="form.categoryId" placeholder="请选择分类" style="width: 100%">
                <el-option v-for="cat in categories" :key="cat.id" :label="cat.name" :value="cat.id" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('upload.tags')">
              <div class="tag-input-wrap">
                <el-input v-model="tagInput" placeholder="输入标签后按回车" @keyup.enter="addTag" />
                <div class="tag-list" v-if="form.tags.length">
                  <el-tag
                    v-for="tag in form.tags"
                    :key="tag"
                    closable
                    @close="removeTag(tag)"
                    style="margin: 4px"
                  >
                    {{ tag }}
                  </el-tag>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>

        <div class="form-card">
          <FileUpload @file-change="onFileChange" />
        </div>

        <div class="form-actions">
          <el-button type="primary" size="large" :loading="uploading" @click="handleUpload">
            {{ t('upload.submit') }}
          </el-button>
          <el-button size="large" @click="router.back()">{{ t('common.cancel') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.upload-page {
  max-width: 800px;
}
.page-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 24px;
}
.upload-layout {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-card {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border-color);
}
.tag-input-wrap {
  width: 100%;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
}
.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
</style>
