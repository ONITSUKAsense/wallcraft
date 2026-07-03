<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const wallpaper = ref({
  id: Number(route.params.id),
  title: '梦幻星河',
  description: '一张充满梦幻色彩的星空壁纸，适合作为手机背景。深邃的蓝色星空配上璀璨的银河，让人仿佛置身于浩瀚宇宙之中。',
  url: `https://picsum.photos/seed/detail${route.params.id}/1080/1920`,
  categoryName: '风景',
  tags: ['星空', '4K', '暗色', '梦幻'],
  width: 1080,
  height: 1920,
  downloads: 8842,
  likes: 1256,
  isLiked: false,
  author: '星空摄影师',
  createdAt: '2024-06-15',
})

const related = Array.from({ length: 6 }, (_, i) => ({
  id: Number(route.params.id) + i + 1,
  title: `相关壁纸 ${i + 1}`,
  thumbnail: `https://picsum.photos/seed/rel${i}/200/350`,
}))

function handleLike() {
  wallpaper.value.isLiked = !wallpaper.value.isLiked
  wallpaper.value.likes += wallpaper.value.isLiked ? 1 : -1
}

function handleDownload() {
  ElMessage.success('壁纸下载已开始')
}

function goBack() {
  router.back()
}
</script>

<template>
  <div class="detail-page">
    <button class="back-btn" @click="goBack">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
      </svg>
      {{ t('common.back') }}
    </button>

    <div class="detail-layout">
      <div class="detail-image">
        <img :src="wallpaper.url" :alt="wallpaper.title" />
      </div>

      <div class="detail-info">
        <h1 class="detail-title">{{ wallpaper.title }}</h1>
        <p class="detail-desc">{{ wallpaper.description }}</p>

        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">{{ t('wallpaper.author') }}</span>
            <span class="info-value">{{ wallpaper.author }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ t('wallpaper.category') }}</span>
            <span class="info-value">{{ wallpaper.categoryName }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ t('wallpaper.resolution') }}</span>
            <span class="info-value">{{ wallpaper.width }}x{{ wallpaper.height }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ t('wallpaper.downloads') }}</span>
            <span class="info-value">{{ wallpaper.downloads.toLocaleString() }}</span>
          </div>
        </div>

        <div class="tags-section">
          <span class="tags-label">{{ t('wallpaper.tags') }}:</span>
          <span v-for="tag in wallpaper.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>

        <div class="action-buttons">
          <el-button type="primary" size="large" @click="handleDownload" class="action-btn-primary">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            {{ t('wallpaper.download') }}
          </el-button>
          <el-button
            :type="wallpaper.isLiked ? 'danger' : 'default'"
            size="large"
            @click="handleLike"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" :fill="wallpaper.isLiked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {{ wallpaper.isLiked ? t('wallpaper.liked') : t('wallpaper.like') }} ({{ wallpaper.likes }})
          </el-button>
        </div>
      </div>
    </div>

    <!-- Related -->
    <section class="related-section">
      <h2 class="section-title">{{ t('wallpaper.related') }}</h2>
      <div class="related-grid">
        <div v-for="item in related" :key="item.id" class="related-card" @click="router.push(`/wallpaper/${item.id}`)">
          <img :src="item.thumbnail" :alt="item.title" />
          <span class="related-title">{{ item.title }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.detail-page {
  max-width: 1100px;
  margin: 0 auto;
}
.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 20px;
  transition: all 0.2s;
}
.back-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}
.detail-layout {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}
.detail-image {
  flex: 1;
  max-width: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
}
.detail-image img {
  width: 100%;
  display: block;
}
.detail-info {
  flex: 1;
}
.detail-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
}
.detail-desc {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 24px;
}
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}
.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.info-label {
  font-size: 12px;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.info-value {
  font-size: 15px;
  color: var(--text-primary);
  font-weight: 500;
}
.tags-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.tags-label { font-size: 14px; color: var(--text-tertiary); }
.tag {
  padding: 4px 12px;
  background: var(--bg-secondary);
  border-radius: 20px;
  font-size: 13px;
  color: var(--text-secondary);
}
.action-buttons {
  display: flex;
  gap: 12px;
}
.action-btn-primary svg { margin-right: 4px; }

/* Related */
.related-section {
  margin-top: 48px;
}
.section-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--text-primary);
}
.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}
.related-card {
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}
.related-card:hover { transform: scale(1.03); }
.related-card img {
  width: 100%;
  aspect-ratio: 9/16;
  object-fit: cover;
  border-radius: 8px;
}
.related-title {
  display: block;
  margin-top: 6px;
  font-size: 13px;
  color: var(--text-secondary);
  text-align: center;
}

@media (max-width: 768px) {
  .detail-layout { flex-direction: column; }
  .detail-image { max-width: 100%; }
}
</style>
