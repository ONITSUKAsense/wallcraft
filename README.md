# Wallcraft — 手机壁纸画廊

<div align="center">

![Vue3](https://img.shields.io/badge/Vue-3.4-4FC08D?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)
![Element Plus](https://img.shields.io/badge/Element_Plus-2.7-409EFF?logo=element)
![License](https://img.shields.io/badge/License-MIT-blue)

[English](./README.md) · [简体中文](./README.zh-CN.md)

</div>

A feature-rich mobile wallpaper gallery built with **Vue 3 + TypeScript**, designed to showcase modern frontend capabilities inspired by Canva's design philosophy.

> **Demo account:** `admin` / `admin123` (administrator, full access)

---

## ✨ Features

| Capability | Implementation |
|---|---|
| **Vue 3 + TypeScript** | `<script setup lang="ts">`, full type coverage |
| **State Management** | Pinia — user, app, wallpaper stores |
| **Route Guard** | `beforeEach` guard with token validation + RBAC role check |
| **HTTP Client** | Axios with interceptors (auto token injection, unified error handling) |
| **Authentication** | Token-based login, persistent session via localStorage |
| **RBAC** | 3 roles (admin / editor / user), route-level & component-level guards |
| **Responsive** | CSS Grid `auto-fill`, media queries, flexible sidebar |
| **Dark Mode** | CSS variables toggle + Element Plus dark classes, flash-free initialization |
| **Charts** | ECharts pie & bar charts on admin dashboard |
| **File Upload** | Drag-and-drop, preview, format/size validation |
| **Markdown Editor** | Toolbar + live preview via `marked`, HTML export |
| **i18n** | Chinese & English, full UI coverage via `vue-i18n` |
| **Abort Controller** | `useRequest` composable auto-cancels in-flight requests on unmount |
| **Mock Service** | Centralized mock layer simulates API responses without backend |

## 🏗 Project Structure

```
wallcraft/
├── public/                    # Static assets
│   └── vite.svg
├── src/
│   ├── api/                   # Axios instance & typed API modules
│   │   ├── request.ts         #   Interceptors, typed api helper
│   │   ├── user.ts            #   Auth & user endpoints
│   │   └── wallpaper.ts       #   Wallpaper & dashboard endpoints
│   ├── components/            # Shared UI components
│   │   ├── AppHeader.vue
│   │   ├── AppSidebar.vue
│   │   ├── FileUpload.vue     #   Drag-and-drop upload with preview
│   │   ├── LangToggle.vue     #   i18n switcher
│   │   ├── MarkdownEditor.vue #   Toolbar + live preview
│   │   └── ThemeToggle.vue    #   Dark mode toggle
│   ├── composables/           # Vue composables
│   │   ├── usePermission.ts   #   Role checking helpers
│   │   ├── useRequest.ts      #   Auto-cancelling async wrapper
│   │   └── useTheme.ts        #   Dark mode state
│   ├── layouts/               # Page layouts
│   │   ├── AuthLayout.vue     #   Login/register layout
│   │   └── DefaultLayout.vue  #   Main app layout with sidebar
│   ├── locales/               # i18n messages
│   │   ├── zh-CN.ts
│   │   └── en.ts
│   ├── mock/                  # Mock data & service
│   │   ├── data.ts            #   Stable mock datasets
│   │   └── service.ts         #   Mock API handlers with delay simulation
│   ├── pages/                 # Route views
│   │   ├── home/              #   Home page (search, categories, grid)
│   │   ├── login/             #   Login / register
│   │   ├── wallpaper/         #   Wallpaper detail
│   │   ├── profile/           #   User profile (with Markdown editor)
│   │   ├── admin/             #   Admin dashboard, wallpaper mgmt, upload, user mgmt
│   │   └── error/             #   403 & 404 pages
│   ├── router/                # Vue Router with permission guard
│   │   └── index.ts
│   ├── stores/                # Pinia stores
│   │   ├── app.ts             #   Theme, sidebar, locale state
│   │   ├── user.ts            #   Auth, user info, role
│   │   └── wallpaper.ts       #   Wallpaper cache, API fallback
│   ├── styles/                # Global styles & CSS variables
│   │   └── variables.css
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts
│   └── utils/                 # Utilities
│       ├── auth.ts            #   Token & user persistence
│       ├── permission.ts      #   Role comparators
│       └── roles.ts           #   Role constants
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

The app runs entirely with **mock data** — no backend required.

## 🧩 Key Architecture Decisions

### Mock Service Layer
All API calls follow a **try-real-API → fallback-to-mock** pattern in Pinia stores. When the backend is unavailable, the mock service (`src/mock/service.ts`) returns realistic responses with simulated network delay. To switch to a real backend, just update the Vite proxy target in `vite.config.ts`.

### RBAC Permission System
Three roles flow from the `UserInfo` object through:
1. **Route guard** (`src/router/index.ts`) — redirects to 403/Login
2. **Sidebar menu** — conditionally renders admin items
3. **Permission composable** (`src/composables/usePermission.ts`) — component-level gating

### Request Cancellation
The `useRequest` composable creates an `AbortController` per request and calls `abort()` in `onUnmounted`. The `api` helper in `request.ts` passes the `signal` to Axios, preventing state updates on unmounted components.

### Dark Mode
An inline `<script>` in `index.html` reads `prefers-color-scheme` before Vue mounts, eliminating the light-to-dark flash. The theme state lives in `useAppStore` and syncs with both custom CSS variables and Element Plus `dark` CSS classes.

## 🗺 Roadmap

- [ ] Virtual scroll / infinite scroll for wallpaper grid
- [ ] Image lightbox with zoom and swipe
- [ ] Real backend integration (NestJS / Express)
- [ ] PWA support with offline caching
- [ ] Social login (Google, GitHub)
- [ ] Batch operations in admin tables
- [ ] E2E tests with Playwright

## 📄 License

MIT
