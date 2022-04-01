<template>
  <div class="pie-echart">
    <base-echart :options="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import baseEchart from '@/base-ui/echart/index'
import { IDataType } from './type/index'
import { defineProps, computed } from 'vue'
const props = defineProps<{ pieData: IDataType[] }>()
const option = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      left: 'left'
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style lang="scss" scoped></style>
