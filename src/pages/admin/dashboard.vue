<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { mockDashboardStats, categoryColors } from '@/mock/data'

const { t } = useI18n()

// Stats cards
const statsCards = ref([
  { label: t('admin.totalWallpapers'), value: mockDashboardStats.totalWallpapers, icon: '🖼️', change: '+12%', color: '#6C5CE7' },
  { label: t('admin.totalUsers'), value: mockDashboardStats.totalUsers, icon: '👥', change: '+8%', color: '#00cec9' },
  { label: t('admin.totalDownloads'), value: mockDashboardStats.totalDownloads, icon: '📥', change: '+23%', color: '#fd79a8' },
  { label: t('admin.todayUploads'), value: mockDashboardStats.todayUploads, icon: '📤', change: '+5%', color: '#fdcb6e' },
])

// Category distribution (pie chart)
const categoryData = mockDashboardStats.categoryDistribution

const pieChartOptions = computed(() => ({
  tooltip: { trigger: 'item' as const },
  legend: { orient: 'vertical' as const, right: 10, top: 'center', textStyle: { color: 'var(--text-secondary)' } },
  series: [{
    type: 'pie',
    radius: ['40%', '70%'],
    avoidLabelOverlap: true,
    itemStyle: { borderRadius: 6, borderColor: 'transparent', borderWidth: 2 },
    label: { show: false },
    emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
    data: categoryData.map((d, i) => ({
      ...d,
      itemStyle: { color: categoryColors[i] },
    })),
  }],
  backgroundColor: 'transparent',
}))

// Weekly downloads (bar chart)
const weeklyDays = mockDashboardStats.weeklyDownloads.map(d => d.day)
const weeklyCounts = mockDashboardStats.weeklyDownloads.map(d => d.count)

const barChartOptions = computed(() => ({
  tooltip: { trigger: 'axis' as const },
  xAxis: {
    type: 'category' as const,
    data: weeklyDays,
    axisLine: { lineStyle: { color: 'var(--border-color)' } },
    axisLabel: { color: 'var(--text-tertiary)' },
  },
  yAxis: {
    type: 'value' as const,
    splitLine: { lineStyle: { color: 'var(--border-color)', type: 'dashed' as const } },
    axisLabel: { color: 'var(--text-tertiary)' },
  },
  series: [{
    type: 'bar',
    data: weeklyCounts,
    itemStyle: {
      borderRadius: [4, 4, 0, 0],
      color: {
        type: 'linear' as const,
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: '#6C5CE7' },
          { offset: 1, color: '#a29bfe' },
        ],
      },
    },
  }],
  grid: { left: 50, right: 20, top: 20, bottom: 30 },
  backgroundColor: 'transparent',
}))

// Recent uploads
const recentUploads = ref(
  Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `壁纸 ${i + 1}`,
    uploader: `用户${i + 1}`,
    date: `2024-06-${String(15 + i).padStart(2, '0')}`,
    status: ['已发布', '审核中', '已发布', '已发布', '审核中', '已发布', '已拒绝', '已发布'][i],
    downloads: Math.floor(Math.random() * 500),
  }))
)
</script>

<template>
  <div class="dashboard">
    <h2 class="page-title">{{ t('admin.dashboard') }}</h2>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div v-for="card in statsCards" :key="card.label" class="stat-card">
        <div class="stat-icon" :style="{ background: card.color + '20', color: card.color }">{{ card.icon }}</div>
        <div class="stat-info">
          <span class="stat-label">{{ card.label }}</span>
          <div class="stat-value-row">
            <span class="stat-value">{{ card.value.toLocaleString() }}</span>
            <span class="stat-change">{{ card.change }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="charts-row">
      <div class="chart-card">
        <h3 class="chart-title">{{ t('admin.categoryDist') }}</h3>
        <div class="chart-container" style="height: 300px;">
          <v-chart :option="pieChartOptions" autoresize />
        </div>
      </div>
      <div class="chart-card">
        <h3 class="chart-title">{{ t('admin.weeklyDownloads') }}</h3>
        <div class="chart-container" style="height: 300px;">
          <v-chart :option="barChartOptions" autoresize />
        </div>
      </div>
    </div>

    <!-- Recent Uploads Table -->
    <div class="chart-card">
      <h3 class="chart-title">最近上传</h3>
      <el-table :data="recentUploads" stripe style="width: 100%" size="small">
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="uploader" label="上传者" />
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="downloads" label="下载量" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === '已发布' ? 'success' : row.status === '审核中' ? 'warning' : 'danger'" size="small">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1200px;
}
.page-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 24px;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}
.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--border-color);
}
.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}
.stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.stat-label {
  font-size: 13px;
  color: var(--text-tertiary);
}
.stat-value-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
}
.stat-change {
  font-size: 13px;
  color: #00b894;
  font-weight: 500;
}
.charts-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}
.chart-card {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--border-color);
}
.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}
.chart-container {
  width: 100%;
}

@media (max-width: 768px) {
  .charts-row { grid-template-columns: 1fr; }
}
</style>
