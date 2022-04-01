<template>
  <div class="user">
    <page-search
      :FormConfig="FormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="PageContentRef"
      :ContentToTable="ContentToTable"
      pageName="/users"
      @newBtnClick="handleNewData"
      @EditBtnclick="handleEditData"
    >
      <template #status="scoped">
        <el-button
          plain
          size="small"
          round
          :type="scoped.row.enable ? 'success' : 'danger'"
          >{{ scoped.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template></page-content
    >
    <page-modal
      title="新建用户"
      :ModalConfig="modalConfigRef"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      pageName="/users"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modale'

import { FormConfig } from './config/search.config'
import { ContentToTable } from './config/content.config'
import { ModalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'

export default defineComponent({
  setup() {
    const [PageContentRef, handleQueryClick, handleResetClick] = usePageSearch()
    //这里操作是页面内自己的操作，故不能放在公共代码里
    const NewCallBack = () => {
      const item = ModalConfig.FormItems.find((item) => {
        return item.filed === 'password'
      })
      item!.isHidden = false
    }
    const EditCallBack = () => {
      const item = ModalConfig.FormItems.find((item) => {
        return item.filed === 'password'
      })
      item!.isHidden = true
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(NewCallBack, EditCallBack)
    //新建用户Modal里动态添加部门和角色列表
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentIdItem = ModalConfig.FormItems.find(
        (item) => item.filed == 'departmentId'
      )
      departmentIdItem!.options = store.state.entireDepartment.map((item) => {
        return {
          label: item.name,
          value: item.id
        }
      })
      const roleItem = ModalConfig.FormItems.find(
        (item) => item.filed == 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return {
          label: item.name,
          value: item.id
        }
      })
      return ModalConfig
    })
    return {
      FormConfig,
      ContentToTable,
      PageContentRef,
      handleResetClick,
      handleQueryClick,
      modalConfigRef,
      pageModalRef,
      handleNewData,
      handleEditData,
      defaultInfo
    }
  },
  components: {
    PageSearch,
    PageContent,
    PageModal
  }
})
</script>

<style scoped>
.fresh {
  margin-right: 5px;
}
.showcontent {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
</style>
