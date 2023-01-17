/**
 * 定义路由组件，将 auth 设置为 true，表示该路由需要权限校验
 */

import { useRoutes } from 'react-router-dom'
import { Suspense, lazy } from 'react'

const routes: any = [
  { path: '/Login', auth: true, component: lazy(() => import('./pages/Login')),login:true},
  {
    path: '/MyRoom/RoomActivityPage',
    component: lazy(() => import('./pages/RoomActivityPage')),
    auth: true,
  },
  {
    path: '/MyRoom/RoomDetailComponent',
    component: lazy(() => import('./pages/RoomDetailPage')),
    auth: true,
  },
  {
    path: '/MyRoom/RoomCard',
    component: lazy(() => import('./components/RoomCard')),
    auth: true,
  },
  {
    path: '/MyRoom/RoomDetailPage/:houseid',
    component: lazy(() => import('./pages/RoomDetailPage')),
    auth: true,
  },
  {
    path: '/MyRoom/ApartmentDetailComponent',
    component: lazy(() => import('./components/ApartmentDetailComponent')),
    auth: true,
  },
  {
    path: '/MyRoom/CommentPageComponent',
    component: lazy(() => import('./components/CommentPageComponent')),
    auth: true,
  },
  {
    path: '*',
    auth: false,
    component: lazy(() => import('./pages/Login')),
  },
]

//根据路径获取路由
const _checkAuth = (routers: any, path: string) => {
  for (const r of routers) {
    if (r.path === path) return r
    if (r.children) {
      const res: any = _checkAuth(r.children, path)
      if (res) return res
    }
  }
  return null
}

const checkRouterAuth = (path: string) => {
  let auth = null
  auth = _checkAuth(routes, path)
  return auth
}


// 路由处理方式
const _generateRouter = (routers: any) => {
  return routers.map((item: any) => {
    if (item.children) {
      item.children = _generateRouter(item.children)
    }
    item.element = (
      <Suspense fallback={<div>加载中...</div>}>
        {/* 把懒加载的异步路由变成组件装载进去 */}
        <item.component />
      </Suspense>
    )
    return item
  })
}

const MyRouter = () => useRoutes(_generateRouter(routes))

export { MyRouter, checkRouterAuth }