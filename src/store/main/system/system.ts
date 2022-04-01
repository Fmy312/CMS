import { Module } from 'vuex'
import { ISystemState, IpayLoad } from './types'
import { RootState } from '../../types'
import {
  getPagesListData,
  DeletePageData,
  createPageData,
  EditPageData
} from '@/service/main/system/systems'
const system: Module<ISystemState, RootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleCount: 0,
      roleList: [],
      goodsCount: 0,
      goodsList: [],
      menuCount: 0,
      menuList: []
    }
  },
  actions: {
    /* 获取相应页面列表的方法 */
    async getPages({ commit }, payload: IpayLoad) {
      /* 获取url */
      const pageUrl = payload.pageName + '/list'
      const res = await getPagesListData(pageUrl, payload.pageInfo)
      const { list, totalCount } = res?.data
      const targetName =
        payload.pageName[1].toUpperCase() + payload.pageName.slice(2)
      commit(`change${targetName}List`, list)
      commit(`change${targetName}number`, totalCount)
    },
    //删除逻辑 已经完成但是后台不给删除，故没效果
    async deletePage(context, payload: IpayLoad) {
      const pageUrl = payload.pageName + `/${payload.pageInfo.id}`
      //调用删除的接口
      DeletePageData(pageUrl)
      //重新请求新的数据
      context.dispatch('getPages', {
        pageName: payload.pageName,
        pageInfo: payload.pageInfo.curPageInfo
      })
    },
    //创建新用户
    async createPageDataAction({ dispatch }, payload: IpayLoad) {
      const { pageName, pageInfo } = payload
      const pageUrl = pageName
      await createPageData(pageUrl, pageInfo)
      dispatch('getPages', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    //修改用户信息
    async editPageDataAction({ dispatch }, payload: IpayLoad) {
      const { pageName, pageInfo, id } = payload
      const pageUrl = pageName + '/' + id
      await EditPageData(pageUrl, pageInfo)
      dispatch('getPages', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeUsersnumber(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRolenumber(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsnumber(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenunumber(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        const PageName = pageName.slice(1) + 'List'
        return (state as any)[PageName]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        const PageName = pageName.slice(1) + 'Count'
        return (state as any)[PageName]
      }
    }
  }
}
export default system
