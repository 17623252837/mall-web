import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * 公共路由  为无需权限控制
 */
export const constantRoutes = [
  {
    path: '/login',
    // component: () => import('@/views/login/index'),
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/email',
    component: Layout,
    redirect: '/email/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/system/email/index'),
        name: '邮箱',
        meta: { title: '邮箱', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: '个人中心',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * 需要权限控制的路由
 *
 * @returns {VueRouter}
 */
export const asyncRoutes = [
  {
    // 权限模块  完成前后端权限控制后 仅超级管理员能够访问
    path:'/permission',
    component: Layout,
    redirect: '/permission/admin',
    name: 'permission',
    meta: {title: '权限', icon: 'user'},
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/permission/admin/index'),
        meta: {title: '用户列表', icon: 'user'}
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/permission/role/index'),
        meta: {title: '角色列表', icon: 'component'}
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () => import('@/views/permission/role/allocMenu'),
        meta: {title: '分配菜单'},
        hidden: true
      },
      {
        path: 'allocResource',
        name: 'allocResource',
        component: () => import('@/views/permission/role/allocResource'),
        meta: {title: '分配资源'},
        hidden: true
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/permission/menu/index'),
        meta: {title: '菜单列表', icon: 'user'}
      },
      {
        path: 'addMenu',
        name: 'addMenu',
        component: () => import('@/views/permission/menu/add'),
        meta: {title: '添加菜单'},
        hidden: true
      },
      {
        path: 'updateMenu',
        name: 'updateMenu',
        component: () => import('@/views/permission/menu/update'),
        meta: {title: '修改菜单'},
        hidden: true
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/permission/resource/index'),
        meta: {title: '资源列表', icon: 'user'},
      },
      {
        path: 'resourceCategory',
        name: 'resourceCategory',
        component: () => import('@/views/permission/resource/categoryList'),
        meta: {title: '资源列表'},
        hidden : true
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system',
    name: 'system',
    meta: {title: '系统工具', icon: 'user'},
    children: [
      {
        path: 'swagger',
        component: () => import('@/views/system/swagger'),
        name: 'swagger',
        meta: { title: '文档管理', icon: 'user', noCache: true }
      },
      {
        path: 'swagger2',
        component: () => import('@/views/system/swagger2'),
        name: 'swagger2',
        meta: { title: '文档管理2', icon: 'user', noCache: true }
      },
      {
        path: 'oss',
        component: () => import('@/views/system/oss'),
        name: 'oss',
        meta: { title: '云存储管理', icon: 'user', noCache: true }
      }
    ]
  }
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
