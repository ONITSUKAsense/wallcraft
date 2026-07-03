import { ref, onUnmounted, type Ref } from 'vue'

/** 自动追踪组件生命周期的请求封装：卸载时取消未完成的请求 */
export function useRequest<T>(
  fetcher: (signal: AbortSignal) => Promise<T>
): {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<string | null>
  execute: () => Promise<T | null>
} {
  const data = ref<T | null>(null) as Ref<T | null>
  const loading = ref(false)
  const error = ref<string | null>(null)

  let abortController: AbortController | null = null

  onUnmounted(() => {
    abortController?.abort()
  })

  async function execute(): Promise<T | null> {
    // Cancel previous pending request
    abortController?.abort()

    abortController = new AbortController()
    loading.value = true
    error.value = null

    try {
      const result = await fetcher(abortController.signal)
      data.value = result
      return result
    } catch (e: any) {
      if (e?.name === 'AbortError' || e?.code === 'ERR_CANCELED') {
        // Silently ignore cancelled requests
        return null
      }
      const msg = e?.response?.data?.message || e?.message || '请求失败'
      error.value = msg
      return null
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, execute }
}
