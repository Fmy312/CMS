import { Module } from 'vuex'
import { IloginState } from './types'
import { RootState } from '../types'
import {
  FAccountLogin,
  requestUserInfo,
  requestUserMens
} from '@/service/login/login'
import router from '@/router'
import { IAccount } from '@/service/login/type'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermission } from '@/utils/map-menus'
const login: Module<IloginState, RootState> = {
  namespaced: true,
  state() {
    return {
      token: ''
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenu(state, userMenus: any) {
      state.userMenus = userMenus
      //注册动态路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      //获取用户按钮权限
      const permission = mapMenusToPermission(userMenus)
      state.permissions = permission
    }
  },
  actions: {
    async actionsLoginAction({ commit, dispatch }, payload: IAccount) {
      //实现登录逻辑
      const res = await FAccountLogin(payload)
      const { id, token } = res.data
      commit('changeToken', token)
      localCache.setCache('token', token)
      //在此地方调用根上的方法，请求users页面modal里的部门和角色信息
      dispatch('getInitDataAction', null, { root: true })
      //请求用户数据
      const userInfoResult = await requestUserInfo(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      //请求用户菜单
      const UserMenus = await requestUserMens(userInfo.role.id)
      commit('changeUserMenu', UserMenus.data)
      localCache.setCache('UserMenus', UserMenus.data)
      //跳转路由
      router.push('/main')
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        //在此地方调用根上的方法，请求users页面modal里的部门和角色信息
        dispatch('getInitDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const UserMenus = localCache.getCache('UserMenus')
      if (UserMenus) {
        commit('changeUserMenu', UserMenus)
      }
    }
  }
}
export { login }
