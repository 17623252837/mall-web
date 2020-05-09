import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  id : '',
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_ID : (state,id) =>{
    state.id = id;
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 获取token
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        // 设置token
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // data 接收用户权限信息
        const { data } = response
        // 判断是否成功获取
        if (!data.roles) {
          reject('角色信息获取失败')
        }
        // 接收
        const { roles, name, avatar, introduction , menus ,nickName ,id} = data

        //
        if (!roles || roles.length <= 0) {
          reject('角色未赋予权限')
        }
        // 赋值
        commit('SET_ROLES', roles)
        commit('SET_NAME', nickName)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_ID',id)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 设置用户信息
  setInfo({ commit },userInfo){
    return new Promise(resolve => {
      const { nickName}  = data;
      commit('SET_NAME', nickName)
    })
  },
  // 退出登录
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // 动态修改权限
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'
      commit('SET_TOKEN', token)
      setToken(token)
      const { roles } = await dispatch('getInfo')
      resetRouter()
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
      router.addRoutes(accessRoutes)
     //  dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
