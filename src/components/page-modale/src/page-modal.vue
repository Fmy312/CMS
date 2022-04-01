<template>
  <div class="page-modal">
    <el-dialog
      v-model="DialogVisible"
      :title="title"
      width="30%"
      center
      destroy-on-close
    >
      <fform v-bind="ModalConfig" v-model:formData="formData"></fform>
      <!-- 用来插入menu-tree，因为并不是公共都有的，故加一个插槽来特殊化 -->
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="DialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import Fform from '@/base-ui/form/src/form.vue'
import { useStore } from '@/store'

export default defineComponent({
  setup(props) {
    const DialogVisible = ref<any>(false)
    const formData = ref<any>({})
    const store = useStore()
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.ModalConfig?.FormItems) {
          formData.value[`${item.filed}`] = newValue[`${item.filed}`]
        }
      }
    )
    const handleConfirmClick = () => {
      DialogVisible.value = false
      //判断是编辑的弹框还是新建的弹框
      if (JSON.stringify(props.defaultInfo) == '{}') {
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          pageInfo: { ...formData.value, ...props.otherInfo }
        })
      } else {
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          pageInfo: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      }
    }
    return {
      formData,
      DialogVisible,
      handleConfirmClick
    }
  },
  components: { Fform },
  props: {
    title: {
      type: String,
      require: true
    },
    ModalConfig: {
      type: Object,
      require: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  }
})
</script>

<style scoped></style>
