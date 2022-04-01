<template>
  <div class="page-content">
    <TaBle
      :ListDate="PageList"
      :ListCount="PageCount"
      v-bind="ContentToTable"
      v-model:Page="PageInfo"
    >
      <!-- header里的插槽 -->
      <template #headerHandler>
        <el-button
          type="primary"
          size="default"
          v-if="isCreate"
          @click="handleNewClick"
          >{{ header }}</el-button
        >
      </template>
      <!-- 表格里的固定插槽 -->
      <template #createAt="scoped">
        <span>{{ $filters.format(scoped.row.createAt) }}</span>
      </template>
      <template #updateAt="scoped">
        <span>{{ $filters.format(scoped.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div>
          <el-button
            type="text"
            size="small"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
            ><el-icon><edit /></el-icon>编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            class="delete"
            v-if="isDelete"
            @click="DeleteInfo(scope.row)"
            ><el-icon><delete /></el-icon>删除</el-button
          >
        </div>
      </template>
      <!-- 动态插槽 -->
      <template
        v-for="item in OtherPropsSlots"
        :key="item"
        #[item.slotName]="scoped"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scoped.row"></slot>
        </template>
      </template>
    </TaBle>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import TaBle from '@/base-ui/table'
import { useStore } from '@/store'
import { userPermission } from '@/hooks/usePessimion'

export default defineComponent({
  props: {
    ContentToTable: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    },
    header: {
      type: String,
      default: '新建用户'
    }
  },
  emits: ['newBtnClick', 'EditBtnclick'],
  setup(props, { emit }) {
    const store = useStore()
    //权限的检查
    const isCreate = userPermission(props.pageName ?? '', 'create')
    const isUpdate = userPermission(props.pageName ?? '', 'update')
    const isDelete = userPermission(props.pageName ?? '', 'delete')
    const isQuery = userPermission(props.pageName ?? '', 'query')

    const PageInfo = ref({ currentPage: 1, pageSize: 10 })
    const curPageInfo = ref()
    watch(PageInfo, () => {
      getPageData()
    })

    //发送网络请求写flag的目的是为了刷新的时候，取第一页的数据
    const getPageData = (queryInfo: any = {}, flag = true) => {
      curPageInfo.value = {
        offset: flag
          ? (PageInfo.value.currentPage - 1) * PageInfo.value.pageSize
          : 0,
        size: PageInfo.value.pageSize,
        ...queryInfo
      }
      if (!isQuery) return
      store.dispatch('system/getPages', {
        pageName: props.pageName,
        pageInfo: curPageInfo.value
      })
    }
    getPageData()

    //获取system模块的数据
    const PageList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    const PageCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )
    //获取动态的插槽
    const OtherPropsSlots = props.ContentToTable?.propList.filter(
      (item: any) => {
        if (
          item.prop == 'updateAt' ||
          item.prop == 'createAt' ||
          item.prop == 'handler'
        ) {
          return false
        }
        return true
      }
    )
    //删除/修改/新建用户
    const DeleteInfo = (Info: any) => {
      store.dispatch('system/deletePage', {
        pageName: props.pageName,
        pageInfo: {
          id: Info.id,
          curPageInfo: curPageInfo.value
        }
      })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('EditBtnclick', item)
    }
    return {
      PageList,
      getPageData,
      PageCount,
      PageInfo,
      OtherPropsSlots,
      isCreate,
      isUpdate,
      isDelete,
      DeleteInfo,
      handleNewClick,
      handleEditClick
    }
  },
  components: {
    TaBle
  }
})
</script>

<style scoped>
.delete {
  color: red !important;
}
</style>
