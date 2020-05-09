import _import from '../router/_import'// 获取组件的方法

function addRouter(routerlist) {
  routerlist.forEach(e => {
    // 删除无用属性
    delete e.code
    delete e.sort
    delete e.generatemenu
    delete e.description
    delete e.permName
    delete e.id
    delete e.parentId

    e.path = e.url
    delete e.url
    e.component = _import(e.name) // 动态匹配组件
    if (e.redirect === '') {
      delete e.redirect
    }
    if (e.icon !== '' && e.title !== '') { // 配置 菜单标题 与 图标
      e.meta = {
        title: e.title,
        icon: e.icon
      }
    }
    if (e.title !== '' && e.icon === '') {
      e.meta = {
        title: e.title
      }
    }
    delete e.icon
    delete e.title
    if (e.children != null) {
      // 存在子路由就递归
      addRouter(e.children)
    }
  })
  return routerlist
}

export { addRouter }
