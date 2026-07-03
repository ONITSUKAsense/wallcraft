import type { Wallpaper, Category, DashboardStats } from '@/types'

/** 稳定的分类数据 */
export const mockCategories: Category[] = [
  { id: 1, name: '风景', icon: 'mountain', count: 128 },
  { id: 2, name: '抽象', icon: 'brush', count: 96 },
  { id: 3, name: '动物', icon: 'dog', count: 64 },
  { id: 4, name: '科技', icon: 'cpu', count: 48 },
  { id: 5, name: '动漫', icon: 'film', count: 72 },
]

const categoryNames = ['风景', '抽象', '动物', '科技', '动漫']

const wallpaperTitles = [
  '梦幻星河', '极光之巅', '城市夜幕', '翠绿森林', '海浪轻吟',
  '山间晨曦', '抽象几何', '萌宠乐园', '赛博都市', '星夜物语',
  '樱花漫舞', '沙漠孤烟', '冰川极境', '霓虹夜色', '水墨丹青',
  '花海秘境', '宇宙深渊', '草原牧歌', '雨后天晴', '枫叶秋韵',
  '海底奇境', '烈焰红莲', '月光宝盒', '未来矩阵',
]

const tagsPool = ['4K', '高清', '精选', '热门', '暗色', '渐变', '极简', '自然', '星空', '城市', '海洋', '梦幻']

function pick<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - 0.3) // 稳定的伪随机
  return shuffled.slice(0, count)
}

/** 稳定的 24 张壁纸 Mock 数据 */
export function getMockWallpapers(): Wallpaper[] {
  return Array.from({ length: 24 }, (_, i) => {
    const catIndex = i % categoryNames.length
    return {
      id: i + 1,
      title: wallpaperTitles[i] || `壁纸 ${i + 1}`,
      description: '一张精美的手机壁纸，适合用作手机背景。',
      url: `https://picsum.photos/seed/wall${i + 1}/400/700`,
      thumbnail: `https://picsum.photos/seed/wall${i + 1}/200/350`,
      categoryId: catIndex + 1,
      categoryName: categoryNames[catIndex],
      tags: pick(tagsPool, 2),
      width: 1080,
      height: 1920,
      downloads: [8842, 6521, 12304, 4432, 7890, 3210, 15670, 2310, 9876, 5432, 11023, 6789, 3456, 21098, 7654, 4321, 18765, 5567, 3344, 9900, 4455, 8877, 2233, 6677][i] || 5000,
      likes: [1256, 890, 2100, 567, 1432, 456, 2890, 345, 1678, 789, 2019, 1023, 567, 3456, 1234, 678, 2876, 890, 456, 1543, 678, 1345, 456, 987][i] || 800,
      isLiked: false,
      author: [`星空摄影师`, '山野行者', '城市猎人', '森林旅人', '海浪诗人', '晨曦画师'][i % 6],
      createdAt: `2024-06-${String((i % 30) + 1).padStart(2, '0')}`,
    }
  })
}

/** 稳定的仪表盘统计数据 */
export const mockDashboardStats: DashboardStats = {
  totalWallpapers: 1248,
  totalUsers: 3862,
  totalDownloads: 89234,
  todayUploads: 47,
  categoryDistribution: [
    { name: '风景', value: 420 },
    { name: '抽象', value: 280 },
    { name: '动物', value: 180 },
    { name: '科技', value: 198 },
    { name: '动漫', value: 170 },
  ],
  weeklyDownloads: [
    { day: '周一', count: 320 },
    { day: '周二', count: 450 },
    { day: '周三', count: 380 },
    { day: '周四', count: 520 },
    { day: '周五', count: 490 },
    { day: '周六', count: 680 },
    { day: '周日', count: 720 },
  ],
}

/** 仪表盘饼图颜色映射 */
export const categoryColors: Record<number, string> = {
  0: '#6C5CE7',
  1: '#00cec9',
  2: '#fd79a8',
  3: '#fdcb6e',
  4: '#74b9ff',
}
