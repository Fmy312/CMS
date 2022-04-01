<template>
  <div class="descriptions" :class="[isMarginBottom ? 'margin-bottom' : '']">
    <el-descriptions :title="title" :column="column" border>
      <template v-for="(item, index) in tableDatas" :key="index">
        <el-descriptions-item :label-align="labelAlign" :align="align">
          <template #label>{{ item.name }}</template>
          <el-tag size="small">{{ item.description }}</el-tag>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DescriPtions',
  props: {
    isMarginBottom: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    column: {
      type: Number,
      default: 2
    },
    labelAlign: {
      tpye: String,
      default: 'center'
    },
    align: {
      type: String,
      default: 'center'
    },
    tableDatas: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.margin-bottom {
  margin-bottom: 20px;
}
</style>
