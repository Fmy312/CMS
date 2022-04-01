<template>
  <div class="base-echart">
    <div ref="EchartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { newEchartInstance } from '@/base-ui/echart'
import { EChartsOption } from 'echarts'

const EchartDivRef = ref<HTMLElement>()
onMounted(() => {
  const { setOptions } = newEchartInstance(EchartDivRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})
const props = withDefaults(
  defineProps<{ width?: string; height?: string; options: EChartsOption }>(),
  {
    width: '100%',
    height: '360px'
  }
)
</script>

<style lang="scss" scoped></style>
