import { createRouter, createWebHistory } from 'vue-router'

/**
 * 路由配置
 * 使用 History 模式，Vercel 通过 vercel.json 配置 SPA fallback
 * 所有页面组件使用懒加载以减小首屏体积
 */
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomePage.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('@/views/GalleryPage.vue'),
    meta: { title: '作品集' }
  },
  {
    path: '/gallery/:category',
    name: 'gallery-category',
    component: () => import('@/views/GalleryPage.vue'),
    meta: { title: '作品集' }
  },
  {
    path: '/photo/:id',
    name: 'photo-detail',
    component: () => import('@/views/PhotoDetailPage.vue'),
    meta: { title: '照片详情' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutPage.vue'),
    meta: { title: '关于我' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundPage.vue'),
    meta: { title: '页面不存在' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // 路由切换时滚动到顶部
  scrollBehavior() {
    return { top: 0 }
  }
})

// 全局后置守卫：动态更新页面标题
router.afterEach((to) => {
  const siteName = '摄影作品集'
  document.title = to.meta.title ? `${to.meta.title} - ${siteName}` : siteName
})

export default router
