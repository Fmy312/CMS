<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="7">
        <fcard title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </fcard>
      </el-col>
      <el-col :span="10">
        <fcard title="不同城市的商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </fcard>
      </el-col>
      <el-col :span="7">
        <fcard title="分发商品数量(玫瑰图)">
          <RoseEchart :RoseData="categoryGoodsCount"></RoseEchart>
        </fcard>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <fcard title="分类商品的销量">
          <line-echart
            :value="categoryGoodsSaleValue"
            :xlabels="categoryGoodsSaleXlabels"
          ></line-echart>
        </fcard>
      </el-col>
      <el-col :span="12">
        <fcard title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </fcard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
/* import * as echarts from 'echarts' */
import Fcard from '@/base-ui/card'
import {
  RoseEchart,
  PieEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echart/index'

export default defineComponent({
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashBoardDataAction')
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSaleXlabels = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return item.name
      })
    })
    const categoryGoodsSaleValue = computed(() => {
      return store.state.dashboard.categoryGoodsSale.map((item: any) => {
        return item.goodsCount
      })
    })
    const categoryGoodsFavor = computed(() => {
      const xlabels: string[] = []
      const value: any[] = []
      store.state.dashboard.categoryGoodsFavor.forEach((item: any) => {
        xlabels.push(item.name)
        value.push(item.goodsFavor)
      })
      return { xlabels, value }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    return {
      categoryGoodsCount,
      categoryGoodsSaleValue,
      categoryGoodsSaleXlabels,
      categoryGoodsFavor,
      addressGoodsSale
    }
  },

  components: { Fcard, PieEchart, RoseEchart, LineEchart, BarEchart, MapEchart }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
