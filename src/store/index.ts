import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { login } from './login/login'
import { IStoreType, RootState } from './types'
import system from './main/system/system'
import { getPagesListData } from '@/service/main/system/systems'
import dashboard from './main/analysis/dashboard'

const store = createStore<RootState>({
  state() {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    changeEntireRole(state, Role: any[]) {
      state.entireRole = Role
    },
    changeEntireDepartMent(state, department: any[]) {
      state.entireDepartment = department
    },
    changeEntireMenu(state, Menu: any[]) {
      state.entireMenu = Menu
    }
  },
  actions: {
    async getInitDataAction({ commit }) {
      //请求部门和角色
      const { data } = await getPagesListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const department = data.list
      commit('changeEntireDepartMent', department)
      const res = await getPagesListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const role = res.data.list
      commit('changeEntireRole', role)
      //请求完整的菜单
      const menuResult = await getPagesListData('/menu/list', {})
      const MenuList = menuResult.data?.list
      commit('changeEntireMenu', MenuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})
export function setUpLogin() {
  store.dispatch('login/loadLocalLogin')
  //可能会导致token为请求下来导致的网络请求的失败
  /* store.dispatch('getInitDataAction') */
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
