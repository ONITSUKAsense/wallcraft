<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const emit = defineEmits<{
  (e: 'file-change', file: File | null): void
}>()

const { t } = useI18n()
const dragOver = ref(false)
const previewUrl = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

function onDragOver(e: DragEvent) {
  e.preventDefault()
  dragOver.value = true
}

function onDragLeave() {
  dragOver.value = false
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  dragOver.value = false
  const files = e.dataTransfer?.files
  if (files?.length) validateAndSet(files[0])
}

function onFileSelect(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) validateAndSet(file)
}

function validateAndSet(file: File) {
  const allowed = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowed.includes(file.type)) {
    ElMessage.warning('只支持 JPG、PNG、WebP 格式')
    return
  }
  if (file.size > 20 * 1024 * 1024) {
    ElMessage.warning('文件大小不能超过 20MB')
    return
  }
  previewUrl.value = URL.createObjectURL(file)
  emit('file-change', file)
}

function triggerUpload() {
  fileInput.value?.click()
}

function removeFile() {
  previewUrl.value = null
  emit('file-change', null)
  if (fileInput.value) fileInput.value.value = ''
}
</script>

<template>
  <div class="file-upload">
    <div
      class="drop-zone"
      :class="{ 'drag-over': dragOver, 'has-preview': !!previewUrl }"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
      @click="!previewUrl && triggerUpload()"
    >
      <template v-if="previewUrl">
        <img :src="previewUrl" alt="preview" class="preview-img" />
        <div class="preview-overlay">
          <el-button size="small" @click.stop="triggerUpload()">重新选择</el-button>
          <el-button size="small" type="danger" @click.stop="removeFile()">移除</el-button>
        </div>
      </template>
      <template v-else>
        <div class="upload-icon">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        <p class="upload-text">{{ t('upload.dropHint') }}</p>
        <p class="upload-hint">{{ t('upload.uploadHint') }}</p>
      </template>
    </div>
    <input
      ref="fileInput"
      type="file"
      accept="image/jpeg,image/png,image/webp"
      style="display: none"
      @change="onFileSelect"
    />
  </div>
</template>

<style scoped>
.drop-zone {
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.drop-zone:hover,
.drop-zone.drag-over {
  border-color: var(--primary);
  background: var(--primary-bg);
}
.drop-zone.has-preview {
  padding: 0;
  border-style: solid;
  overflow: hidden;
}
.preview-img {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
}
.preview-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: linear-gradient(transparent, rgba(0,0,0,0.6));
  display: flex;
  gap: 8px;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}
.drop-zone.has-preview:hover .preview-overlay {
  opacity: 1;
}
.upload-icon {
  color: var(--text-tertiary);
  margin-bottom: 12px;
}
.upload-text {
  font-size: 15px;
  color: var(--text-primary);
  margin-bottom: 8px;
}
.upload-hint {
  font-size: 12px;
  color: var(--text-tertiary);
}
</style>
