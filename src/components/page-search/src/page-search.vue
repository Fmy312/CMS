<template>
  <div class="page-search">
    <fform v-bind="FormConfig" v-model:formData="formData">
      <template #header> <h3>高级检索</h3> </template>
      <template #footer>
        <span class="fresh" @click="addRotateAndFresh()"
          ><el-button
            ><el-icon :class="{ 'is-loading': flag }"> <loading /> </el-icon>
            <span>重置</span></el-button
          ></span
        >
        <span class="search" @click="handleQueryClick"
          ><el-button type="primary">
            <el-icon style="vertical-align: middle">
              <search />
            </el-icon>
            <span style="vertical-align: middle"> 搜索</span>
          </el-button></span
        >
      </template>
    </fform>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Fform from '@/base-ui/index'
export default defineComponent({
  setup(props, { emit }) {
    //动态决定重置按钮里的样式以及重置
    let flag = ref(false)
    const addRotateAndFresh = () => {
      flag.value = true
      setTimeout(() => {
        flag.value = false
      }, 1000)
      for (let key in formOriginData) {
        formData.value[key] = formOriginData[key]
      }
      //发送请求
      emit('resetBtnClick')
    }
    //搜索逻辑
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    const formItem = props.FormConfig?.FormItems ?? []
    const formOriginData: any = {}
    for (let data of formItem) {
      formOriginData[data.filed] = ''
    }
    //与表单绑定的元素
    const formData = ref(formOriginData)
    return {
      formData,
      addRotateAndFresh,
      flag,
      handleQueryClick
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  components: { Fform },
  props: {
    FormConfig: {
      require: true,
      type: Object
    }
  }
})
</script>

<style scoped>
.fresh {
  margin-right: 5px;
}
</style>
