import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'


NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no re

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // 设置页面title
  document.title = getPageTitle(to.meta.title)
  // 获取token
  const hasToken = getToken()
  // 判断token 是否存在
  if (hasToken) {
    // 实时获取权限
    // 前往登录页
    if (to.path === '/login') {
      next({ path: '/dashboard' })
      NProgress.done()
    }
    // 前往其他页面
    else {
      // 受否获取到权限
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取权限
          const data = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', data);
          // 添加路由权限
          router.addRoutes(accessRoutes)
          // 替换路由目录
          router.options.routes= store.getters.permission_routes
          next({ ...to, replace: true })
        } catch (error) {
          Message.error(error || 'Has Error')
          next({ path: '/login' })
          NProgress.done()
        }
      }
    }
  }
  // Token 不存在
  else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
