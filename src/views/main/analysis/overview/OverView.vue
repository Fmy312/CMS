<template>
  <div class="overview" ref="OverViewRef">
    <Card title="关于">
      Vue3Admin 是基于 Vue3、Vuex、VueRouter、Vite、 ElementPlus
      、TypeScript、Echart5 等后台系统解决方案。
    </Card>

    <Card title="技术栈">
      <TextLInks :links="technologyStacks"></TextLInks>
    </Card>

    <Card title="生产环境依赖">
      <Descriptions :tableDatas="dependencies" />
    </Card>

    <Card title="开发环境依赖">
      <Descriptions :tableDatas="devDependencies" />
    </Card>

    <Card title="项目规范">
      <Descriptions
        title="文件命名规范"
        isMarginBottom
        :column="1"
        :table-datas="FileName"
      />
      <Descriptions title="编写组件规范" :tableDatas="ComponentStandard" />
    </Card>

    <Card title="Git规范">
      <Descriptions
        :tableDatas="GitStandard"
        :column="1"
        labelAlign="left"
        align="left"
      />
    </Card>

    <Card title="项目结构">
      <Code :sourceCode="projectDir" />
    </Card>
  </div>
</template>

<script lang="ts">
// Core
import { defineComponent, ref } from 'vue'

// Component
import Card from '@/base-ui/card'
import TextLInks from '@/components/TextLinks/'
import Descriptions from '@/components/Descriptions/'
import Code from '@/components/Code/'

// Config
import {
  technologyStacks,
  devDependencies,
  dependencies,
  projectDir,
  GitStandard,
  FileName,
  ComponentStandard
} from './config'

export default defineComponent({
  components: {
    Card,
    TextLInks,
    Descriptions,
    Code
  },
  setup() {
    const OverViewRef = ref<HTMLElement>()
    return {
      // 技术栈
      technologyStacks,
      // 依赖
      devDependencies,
      dependencies,
      // 目录
      projectDir,
      GitStandard,
      FileName,
      ComponentStandard,
      OverViewRef
    }
  }
})
</script>

<style lang="less" scoped>
.overview {
  .el-card {
    margin-bottom: 10px;
  }
}
</style>
