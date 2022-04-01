import { Module } from 'vuex'
import { IdashBoardState } from './types'
import { RootState } from '../../types'
import {
  getAddressGoodsSale,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale
} from '@/service/main/analysis/analysis'
const dashBoardModule: Module<IdashBoardState, RootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  actions: {
    async getDashBoardDataAction({ commit }) {
      const CategoryCountResult = await getCategoryGoodsCount()
      commit('changeCategoryCount', CategoryCountResult.data)
      const CategorySaleResult = await getCategoryGoodsSale()
      commit('changeCategorySale', CategorySaleResult.data)
      const CategoryFavorResult = await getCategoryGoodsFavor()
      commit('changeCategoryFavor', CategoryFavorResult.data)
      const AddressSaleResult = await getAddressGoodsSale()
      commit('changeAddressCount', AddressSaleResult.data)
    }
  },
  mutations: {
    changeCategoryCount(state, List: any) {
      state.categoryGoodsCount = List
    },
    changeCategorySale(state, List: any) {
      state.categoryGoodsSale = List
    },
    changeCategoryFavor(state, List: any) {
      state.categoryGoodsFavor = List
    },
    changeAddressCount(state, List: any) {
      state.addressGoodsSale = List
    }
  },
  getters: {}
}
export default dashBoardModule
