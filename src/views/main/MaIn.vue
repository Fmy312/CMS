<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-menu :isCollapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header"
          ><NavHeader @foldChange="handleFontChange"
        /></el-header>
        <el-main class="page-main">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu/index'
import NavHeader from '@/components/nav-header/index'

export default defineComponent({
  name: 'MaIn',
  setup() {
    let isCollapse = ref(false)
    const handleFontChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return {
      isCollapse,
      handleFontChange
    }
  },
  components: { NavMenu, NavHeader }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .main-content {
    height: 100%;
  }
  .el-aside {
    background-color: #21252b;
  }
  .page {
    .page-header {
      line-height: 40px;
      height: 40px;
    }
    .page-main {
      text-align: center;
      background-color: #f1f3f4;
      .page-info {
        background-color: #fff;
        border-radius: 5px;
      }
    }
  }
}
</style>
