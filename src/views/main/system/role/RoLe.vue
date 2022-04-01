<template>
  <div class="role">
    <page-search
      :FormConfig="FormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="PageContentRef"
      :ContentToTable="ContentToTable"
      pageName="/role"
      header="新建角色"
      @newBtnClick="handleNewData"
      @EditBtnclick="handleEditData"
    ></page-content>
    <page-modal
      :ModalConfig="ModalConfig"
      ref="pageModalRef"
      pageName="/role"
      title="新建角色"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="ElTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'

import { ElTree } from 'element-plus'
import pageContent from '@/components/page-content/index'
import pageSearch from '@/components/page-search/index'
import pageModal from '@/components/page-modale/index'

import { ContentToTable } from './config/content.config'
import { FormConfig } from './config/search.config'
import { ModalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

import { getMenuLeafKeys } from '@/utils/map-menus'

export default defineComponent({
  setup() {
    //修改用户信息时，使得已给予的权限能绑定上去
    const ElTreeRef = ref<InstanceType<typeof ElTree>>()
    const eidtCbk = (item: any) => {
      const leftkeys = getMenuLeafKeys(item.menuList)
      nextTick(() => {
        ElTreeRef.value?.setCheckedKeys(leftkeys, false)
      })
    }
    const [PageContentRef, handleQueryClick, handleResetClick] = usePageSearch()
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, eidtCbk)
    const store = useStore()
    //用计算属性的意义是，因为store里的请求时异步的，可能导致数据为请求下来，而执行了赋值操作，将menus赋值为了空数组
    //setup只会执行一次，故需要运用computed动态的绑定数据
    const menus = computed(() => store.state.entireMenu)
    //创建新用户时的操作
    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkId = data2.checkedKeys
      const halfcheckId = data2.halfCheckedKeys
      const menuList = [...checkId, ...halfcheckId]
      console.log(menuList)
      otherInfo.value = { menuList }
    }
    return {
      ContentToTable,
      FormConfig,
      handleQueryClick,
      handleResetClick,
      PageContentRef,
      ModalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      menus,
      handleCheckChange,
      otherInfo,
      ElTreeRef
    }
  },
  components: {
    pageContent,
    pageSearch,
    pageModal
  }
})
</script>

<style scoped>
.menu-tree {
  margin-left: 25px;
}
</style>
