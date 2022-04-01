import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/MaIn.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/LoGin.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not/found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})
router.beforeEach((to) => {
  if (to.path != '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  if (to.path == '/main') {
    return firstMenu.url
  }
  //获取全部的路由对象route对象
  /* console.log(router.getRoutes()) */
})
export default router
