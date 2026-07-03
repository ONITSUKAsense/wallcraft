<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { marked } from 'marked'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const activeTab = ref<'edit' | 'preview'>('edit')
const content = computed(() => props.modelValue)
const renderedHtml = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

watch(content, async (val) => {
  renderedHtml.value = await marked(val || '')
}, { immediate: true })

function onInput(e: Event) {
  const target = e.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

function insertTag(before: string, after = '') {
  const textarea = textareaRef.value
  if (!textarea) return
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selected = content.value.substring(start, end)
  const newText = before + selected + after
  const newContent = content.value.substring(0, start) + newText + content.value.substring(end)
  emit('update:modelValue', newContent)
}

function insertBold() { insertTag('**', '**') }
function insertItalic() { insertTag('*', '*') }
function insertHeading() { insertTag('## ') }
function insertLink() { insertTag('[', '](url)') }
function insertImage() { insertTag('![', '](url)') }
function insertList() { insertTag('- ') }
function insertCode() { insertTag('```\n', '\n```') }

async function copyHtml() {
  const html = await marked(content.value || '')
  await navigator.clipboard.writeText(html)
  ElMessage.success('HTML Copied')
}
</script>

<template>
  <div class="markdown-editor">
    <div class="md-toolbar">
      <div class="toolbar-group">
        <button class="tool-btn" title="Bold" @click="insertBold"><strong>B</strong></button>
        <button class="tool-btn" title="Italic" @click="insertItalic"><em>I</em></button>
        <button class="tool-btn" title="Heading" @click="insertHeading">H</button>
        <button class="tool-btn" title="Link" @click="insertLink">Link</button>
        <button class="tool-btn" title="Image" @click="insertImage">Img</button>
        <button class="tool-btn" title="List" @click="insertList">List</button>
        <button class="tool-btn" title="Code" @click="insertCode">Code</button>
      </div>
      <div class="toolbar-group">
        <button class="tool-btn" :class="{ active: activeTab === 'edit' }" @click="activeTab = 'edit'">Edit</button>
        <button class="tool-btn" :class="{ active: activeTab === 'preview' }" @click="activeTab = 'preview'">Preview</button>
        <button class="tool-btn" @click="copyHtml">Copy HTML</button>
      </div>
    </div>
    <div class="md-body">
      <textarea
        ref="textareaRef"
        v-show="activeTab === 'edit'"
        class="md-textarea"
        :value="content"
        @input="onInput"
        placeholder="Enter Markdown content..."
      ></textarea>
      <div
        v-show="activeTab === 'preview'"
        class="md-preview markdown-body"
        v-html="renderedHtml"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.markdown-editor {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}
.md-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  flex-wrap: wrap;
  gap: 4px;
}
.toolbar-group {
  display: flex;
  gap: 2px;
  flex-wrap: wrap;
}
.tool-btn {
  padding: 4px 10px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.tool-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}
.tool-btn.active {
  background: var(--primary);
  color: #fff;
}
.md-body {
  min-height: 200px;
}
.md-textarea {
  width: 100%;
  min-height: 200px;
  padding: 16px;
  border: none;
  outline: none;
  resize: vertical;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.6;
  background: var(--bg-primary);
  color: var(--text-primary);
}
.md-preview {
  padding: 16px;
  min-height: 200px;
}
</style>

<style>
.markdown-body h1,
.markdown-body h2,
.markdown-body h3 {
  margin-top: 1em;
  margin-bottom: 0.5em;
  color: var(--text-primary);
}
.markdown-body p {
  margin-bottom: 1em;
  line-height: 1.7;
  color: var(--text-primary);
}
.markdown-body code {
  background: var(--bg-secondary);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}
.markdown-body pre {
  background: var(--bg-secondary);
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
}
.markdown-body pre code {
  background: none;
  padding: 0;
}
.markdown-body img {
  max-width: 100%;
  border-radius: 8px;
}
.markdown-body ul,
.markdown-body ol {
  padding-left: 24px;
  margin-bottom: 1em;
}
.markdown-body blockquote {
  border-left: 3px solid var(--primary);
  padding-left: 12px;
  color: var(--text-secondary);
  margin-bottom: 1em;
}
.markdown-body a {
  color: var(--primary);
}
</style>
