<template>
  <div class="nav-header">
    <span class="fold-menu" @click="handleFontChange">
      <template v-if="!isFold">
        <el-icon class="fold-style"><fold /></el-icon>
      </template>
      <template v-if="isFold">
        <el-icon><expand /></el-icon>
      </template>
    </span>
    <div class="content">
      <div><bread-crumb :breadcrumbs="breadcrumbs"></bread-crumb></div>
      <div><UserInfo /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import BreadCrumb from '@/base-ui/breadcrumb'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { PathMapBreadCrumbs } from '@/utils/map-menus'

export default defineComponent({
  setup(_, { emit }) {
    let isFold = ref(false)
    //改变Header图标的类型
    const handleFontChange = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    //面包屑的相关操作
    const Store = useStore()
    const userMenus = Store.state.login.userMenus
    const breadcrumbs = computed(() => {
      const route = useRoute()
      const path = route.path
      return PathMapBreadCrumbs(userMenus, path)
    })
    return {
      isFold,
      handleFontChange,
      breadcrumbs
    }
  },
  components: {
    UserInfo,
    BreadCrumb
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 100%;
  .fold-menu {
    font-size: 30px;
    line-height: 40px;
    cursor: pointer;
  }
  .content {
    display: flex;
    padding: 0 20px;
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
