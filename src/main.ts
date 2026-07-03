import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, BarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'
import zhCN from './locales/zh-CN'
import en from './locales/en'
import './styles/variables.css'

// Register ECharts components
use([CanvasRenderer, PieChart, BarChart, TooltipComponent, LegendComponent, GridComponent])

// i18n (Composition API mode)
const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'en',
  messages: { 'zh-CN': zhCN, en },
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(i18n)
app.component('VChart', VChart)

app.mount('#app')
