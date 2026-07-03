<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getMockWallpapers, mockCategories } from '@/mock/data'

const router = useRouter()
const { t } = useI18n()

const activeCategory = ref(0)
const searchKeyword = ref('')

// 稳定的一次性初始化
const allWallpapers = getMockWallpapers()

const categories = ref([
  { id: 0, name: '全部', icon: '🔥', count: 999 },
  ...mockCategories.map(c => ({ id: c.id, name: c.name, icon: ['🏔','🎨','🐾','💻','🎬'][c.id - 1], count: c.count })),
])

const hotTags = ['4K', '暗色', '渐变', '极简', '自然', '城市', '星空', '海洋']

// 响应式收藏状态（本地维护，不与 store 冲突）
const likedSet = ref(new Set<number>())
function toggleLiked(id: number) {
  if (likedSet.value.has(id)) likedSet.value.delete(id)
  else likedSet.value.add(id)
  // 触发响应式
  likedSet.value = new Set(likedSet.value)
}

// 过滤后的壁纸（搜索 + 分类）
const filteredWallpapers = computed(() => {
  return allWallpapers.filter(wp => {
    const matchCategory = activeCategory.value === 0 || wp.categoryId === activeCategory.value
    const kw = searchKeyword.value.trim().toLowerCase()
    const matchSearch = !kw
      || wp.title.toLowerCase().includes(kw)
      || wp.tags.some(t => t.toLowerCase().includes(kw))
      || wp.categoryName.toLowerCase().includes(kw)
    return matchCategory && matchSearch
  }).map(wp => ({
    ...wp,
    isLiked: likedSet.value.has(wp.id),
    likes: wp.likes + (likedSet.value.has(wp.id) ? 1 : 0),
  }))
})

function filterByCategory(id: number) {
  activeCategory.value = id
}

function toDetail(id: number) {
  router.push(`/wallpaper/${id}`)
}

function handleLike(e: Event, id: number) {
  e.stopPropagation()
  toggleLiked(id)
}

function handleDownload(e: Event, id: number) {
  e.stopPropagation()
  ElMessage.success('下载任务已开始')
}
</script>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <h1 class="hero-title">{{ t('home.title') }}</h1>
      <p class="hero-subtitle">{{ t('home.subtitle') }}</p>
      <div class="hero-search">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input v-model="searchKeyword" type="text" :placeholder="t('home.search')" />
        <button class="search-btn">{{ t('common.search') }}</button>
      </div>
      <div class="hot-tags">
        <span class="tags-label">{{ t('home.hotTags') }}:</span>
        <span v-for="tag in hotTags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </section>

    <!-- Categories -->
    <section class="categories">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="category-chip"
        :class="{ active: activeCategory === cat.id }"
        @click="filterByCategory(cat.id)"
      >
        <span class="cat-icon">{{ cat.icon }}</span>
        <span class="cat-name">{{ cat.name }}</span>
        <span class="cat-count">{{ cat.count }}</span>
      </button>
    </section>

    <!-- Wallpaper Grid -->
    <section class="wallpaper-grid">
      <div
        v-for="wp in filteredWallpapers"
        :key="wp.id"
        class="wallpaper-card"
        @click="toDetail(wp.id)"
      >
        <div class="card-image">
          <img :src="wp.thumbnail" :alt="wp.title" loading="lazy" />
          <div class="card-overlay">
            <button class="action-btn like-btn" :class="{ liked: wp.isLiked }" @click="handleLike($event, wp.id)">
              <svg viewBox="0 0 24 24" width="18" height="18" :fill="wp.isLiked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <button class="action-btn download-btn" @click="handleDownload($event, wp.id)">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </button>
          </div>
          <div class="card-badge">{{ wp.width }}x{{ wp.height }}</div>
        </div>
        <div class="card-info">
          <h3 class="card-title">{{ wp.title }}</h3>
          <div class="card-stats">
            <span>{{ wp.likes }} 收藏</span>
            <span>{{ wp.downloads }} 下载</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Empty state -->
    <div v-if="filteredWallpapers.length === 0" class="empty-state">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <p>没有找到匹配的壁纸</p>
      <el-button size="small" @click="searchKeyword = ''; activeCategory = 0">清除筛选</el-button>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
}
/* Hero */
.hero {
  text-align: center;
  padding: 60px 20px 40px;
}
.hero-title {
  font-size: 42px;
  font-weight: 800;
  background: linear-gradient(135deg, #6C5CE7, #a29bfe, #fd79a8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
}
.hero-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 28px;
}
.hero-search {
  display: flex;
  align-items: center;
  max-width: 560px;
  margin: 0 auto;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 4px 4px 4px 16px;
  gap: 8px;
  color: var(--text-tertiary);
}
.hero-search input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 15px;
  color: var(--text-primary);
}
.search-btn {
  padding: 8px 24px;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}
.hot-tags {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  flex-wrap: wrap;
}
.tags-label {
  font-size: 13px;
  color: var(--text-tertiary);
}
.tag {
  padding: 4px 12px;
  background: var(--bg-secondary);
  border-radius: 20px;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}
.tag:hover {
  background: var(--primary-bg);
  color: var(--primary);
}

/* Categories */
.categories {
  display: flex;
  gap: 8px;
  padding: 20px;
  overflow-x: auto;
  flex-wrap: wrap;
}
.category-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  background: var(--bg-primary);
  cursor: pointer;
  font-size: 14px;
  color: var(--text-secondary);
  transition: all 0.2s;
  white-space: nowrap;
}
.category-chip:hover {
  border-color: var(--primary);
  color: var(--primary);
}
.category-chip.active {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}
.cat-count {
  font-size: 12px;
  opacity: 0.7;
}

/* Wallpaper Grid */
.wallpaper-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
}
.wallpaper-card {
  border-radius: 12px;
  overflow: hidden;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.3s;
}
.wallpaper-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
}
.card-image {
  position: relative;
  aspect-ratio: 9 / 16;
  overflow: hidden;
}
.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.wallpaper-card:hover .card-image img {
  transform: scale(1.05);
}
.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: linear-gradient(transparent, rgba(0,0,0,0.5));
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  opacity: 0;
  transition: opacity 0.3s;
}
.wallpaper-card:hover .card-overlay {
  opacity: 1;
}
.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
}
.action-btn:hover { transform: scale(1.1); }
.action-btn.liked { color: #e74c3c; background: rgba(255,255,255,0.95); }
.card-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 2px 8px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  font-size: 11px;
  border-radius: 4px;
}
.card-info {
  padding: 12px;
}
.card-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-stats {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: var(--text-tertiary);
}

/* Load More */
.load-more {
  text-align: center;
  padding: 32px;
}

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 60px 20px;
  color: var(--text-tertiary);
}
.empty-state p {
  font-size: 16px;
}

@media (max-width: 600px) {
  .hero-title { font-size: 28px; }
  .wallpaper-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 12px; }
}
</style>
