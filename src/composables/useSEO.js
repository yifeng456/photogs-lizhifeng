import { watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

/**
 * 动态 SEO 管理
 * 自动根据路由更新页面 title、meta description、Open Graph 标签
 *
 * 使用方式：
 *   useSEO({ title: '首页', description: '...' })
 *
 * 路由守卫 router.afterEach 已处理基础 title，
 * 此 composable 用于页面级别的精细化控制（description、og:image 等）
 */
export function useSEO(options = {}) {
  const route = useRoute()
  const siteName = '光影记录 - 个人摄影作品集'

  function updateMeta() {
    const title = options.title || route.meta?.title || '摄影作品集'
    const description = options.description || '用镜头记录生活的美好瞬间，个人摄影作品展示'
    const image = options.image || '/og-image.jpg'
    const url = options.url || `https://photogs-lizhifeng.vercel.app${route.path}`

    // 页面标题
    document.title = `${title} - ${siteName}`

    // Meta description
    setMetaTag('description', description)

    // Open Graph
    setMetaTag('og:title', `${title} - ${siteName}`, 'property')
    setMetaTag('og:description', description, 'property')
    setMetaTag('og:image', image, 'property')
    setMetaTag('og:url', url, 'property')
    setMetaTag('og:type', 'website', 'property')

    // Twitter Card
    setMetaTag('twitter:card', 'summary_large_image')
    setMetaTag('twitter:title', `${title} - ${siteName}`)
    setMetaTag('twitter:description', description)
    setMetaTag('twitter:image', image)
  }

  // 路由变化时自动更新
  watch(() => route.fullPath, updateMeta)
  onMounted(updateMeta)
}

/** 创建或更新 <meta> 标签 */
function setMetaTag(name, content, attribute = 'name') {
  if (!content) return
  let el = document.querySelector(`meta[${attribute}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}
