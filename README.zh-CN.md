# Wallcraft — 手机壁纸画廊

<div align="center">

![Vue3](https://img.shields.io/badge/Vue-3.4-4FC08D?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)
![Element Plus](https://img.shields.io/badge/Element_Plus-2.7-409EFF?logo=element)
![License](https://img.shields.io/badge/License-MIT-blue)

[English](./README.md) · [简体中文](./README.zh-CN.md)

</div>

基于 **Vue 3 + TypeScript** 构建的全功能手机壁纸网站，参考 Canva 设计理念，展示现代前端工程化能力。

> **演示账号：** `admin` / `admin123`（管理员，拥有全部权限）

---

## ✨ 核心技术点

| 能力 | 实现 |
|---|---|
| **Vue 3 + TypeScript** | 全站 `<script setup lang="ts">`，完整类型覆盖 |
| **状态管理** | Pinia — user、app、wallpaper 三个 store |
| **路由权限** | `beforeEach` 守卫 + Token 校验 + RBAC 角色判断 |
| **HTTP 客户端** | Axios 拦截器（自动注入 Token、统一错误处理） |
| **登录认证** | Token 登录，localStorage 持久化会话 |
| **RBAC** | 三级角色（admin/editor/user），路由级+组件级双重控制 |
| **响应式布局** | CSS Grid `auto-fill`、媒体查询、伸缩侧边栏 |
| **深色模式** | CSS 变量 + Element Plus dark class 联动，无闪烁初始化 |
| **图表可视化** | ECharts 饼图 + 柱状图展示仪表盘数据 |
| **文件上传** | 拖拽上传、即时预览、格式/大小校验 |
| **Markdown 编辑** | 工具栏 + 实时预览（marked），支持导出 HTML |
| **国际化 i18n** | 中英双语，全界面覆盖 |
| **请求取消** | `useRequest` composable 在组件卸载时自动取消未完成请求 |
| **Mock 服务层** | 集中式 mock 层，无需后端即可完整运行 |

## 🏗 项目结构

```
wallcraft/
├── public/                    # 静态资源
│   └── vite.svg
├── src/
│   ├── api/                   # Axios 实例 & 类型安全 API 模块
│   │   ├── request.ts         #   拦截器、类型化 api 辅助函数
│   │   ├── user.ts            #   认证 & 用户接口
│   │   └── wallpaper.ts       #   壁纸 & 仪表盘接口
│   ├── components/            # 共享 UI 组件
│   │   ├── AppHeader.vue      #   顶栏（搜索、主题、语言切换）
│   │   ├── AppSidebar.vue     #   侧边导航（按角色动态渲染）
│   │   ├── FileUpload.vue     #   拖拽上传 + 预览
│   │   ├── LangToggle.vue     #   语言切换
│   │   ├── MarkdownEditor.vue #   Markdown 编辑器（工具栏+预览）
│   │   └── ThemeToggle.vue    #   深色模式切换
│   ├── composables/           # Vue 组合式函数
│   │   ├── usePermission.ts   #   角色检查工具
│   │   ├── useRequest.ts      #   自动取消的异步请求封装
│   │   └── useTheme.ts        #   深色模式状态
│   ├── layouts/               # 页面布局
│   │   ├── AuthLayout.vue     #   登录布局（双栏设计）
│   │   └── DefaultLayout.vue  #   主应用布局（顶栏+侧边栏）
│   ├── locales/               # 国际化文案
│   │   ├── zh-CN.ts
│   │   └── en.ts
│   ├── mock/                  # Mock 数据 & 服务
│   │   ├── data.ts            #   稳定的模拟数据集
│   │   └── service.ts         #   Mock API 处理器（含延迟模拟）
│   ├── pages/                 # 路由页面
│   │   ├── home/              #   首页（搜索、分类、壁纸网格）
│   │   ├── login/             #   登录 / 注册
│   │   ├── wallpaper/         #   壁纸详情
│   │   ├── profile/           #   个人中心（含 Markdown 编辑器）
│   │   ├── admin/             #   仪表盘、壁纸管理、上传、用户管理
│   │   └── error/             #   403 & 404 页面
│   ├── router/                # Vue Router（含权限守卫）
│   │   └── index.ts
│   ├── stores/                # Pinia 状态管理
│   │   ├── app.ts             #   主题、侧边栏、语言
│   │   ├── user.ts            #   认证、用户信息、角色
│   │   └── wallpaper.ts       #   壁纸缓存、API 降级
│   ├── styles/                # 全局样式 & CSS 变量
│   │   └── variables.css
│   ├── types/                 # TypeScript 类型定义
│   │   └── index.ts
│   └── utils/                 # 工具函数
│       ├── auth.ts            #   Token & 用户持久化
│       ├── permission.ts      #   角色比较器
│       └── roles.ts           #   角色常量
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 🚀 快速启动

```bash
# 安装依赖
npm install

# 启动开发服务器 (http://localhost:3000)
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

无需后端，所有数据由 Mock 服务层提供。

## 页面展示

<img width="1910" height="984" alt="Screenshot 2026-07-08 172709" src="https://github.com/user-attachments/assets/be4c1c50-7d7d-4efb-b045-f31f9cfc2c3a" />
<img width="1906" height="985" alt="Screenshot 2026-07-08 172719" src="https://github.com/user-attachments/assets/10a9fb0d-a3ca-49d0-9e35-cf599fc3b8a4" />
<img width="1898" height="988" alt="image" src="https://github.com/user-attachments/assets/8bf70747-772a-4767-a064-262be3bd64cb" />
<img width="1913" height="979" alt="Screenshot 2026-07-08 172734" src="https://github.com/user-attachments/assets/a307839c-2f74-4967-b1cc-36ce12cf52e2" />
<img width="1887" height="988" alt="image" src="https://github.com/user-attachments/assets/8b0dd834-7658-4ade-a7e1-4c4936638dde" />


## 🧩 关键架构决策

### Mock 服务层
所有 API 调用采用 **try-API → fallback-mock** 模式。后端不可用时，Mock 服务（`src/mock/service.ts`）返回带网络延迟模拟的真实感数据。接入真实后端只需修改 `vite.config.ts` 的代理目标。

### RBAC 权限系统
三个角色通过 `UserInfo` 对象流转于三层：
1. **路由守卫** (`src/router/index.ts`) — 跳转 403/登录页
2. **侧边栏菜单** — 按角色条件渲染
3. **权限 composable** (`src/composables/usePermission.ts`) — 组件级细粒度控制

### 请求取消
`useRequest` composable 为每个请求创建 `AbortController`，在 `onUnmounted` 中自动执行 `abort()`，避免在已卸载组件上触发状态更新。

### 深色模式
`index.html` 中的内联 `<script>` 在 Vue 挂载前读取 `prefers-color-scheme`，消除亮色→深色的闪烁。主题状态存放在 `useAppStore`，同步自定义 CSS 变量和 Element Plus 的 `dark` CSS 类。

## 🗺 路线图

- [ ] 虚拟滚动 / 无限滚动优化壁纸列表
- [ ] 图片灯箱（缩放、滑动切换）
- [ ] 真实后端集成（NestJS / Express）
- [ ] PWA 支持（离线缓存）
- [ ] 第三方登录（Google、GitHub）
- [ ] 管理后台批量操作
- [ ] Playwright E2E 测试

## 📄 License

MIT
