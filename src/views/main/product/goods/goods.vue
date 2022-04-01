<template>
  <div>
    <page-content
      :ContentToTable="ContentToTable"
      pageName="/goods"
      header="新建商品"
    >
      <template #image="scoped">
        <div class="demo-image">
          <el-image
            style="width: 60px; height: 60px"
            :src="scoped.row.imgUrl"
            :preview-src-list="[scoped.row.imgUrl]"
            fit="cover"
          />
        </div>
      </template>
      <template #status="scoped">
        <el-button
          plain
          size="small"
          round
          :type="scoped.row.status ? 'success' : 'danger'"
          >{{ scoped.row.status ? '启用' : '禁用' }}
        </el-button>
      </template></page-content
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content/index'

import { ContentToTable } from './config/content.config'

export default defineComponent({
  name: 'GooDs',
  components: { pageContent },
  setup() {
    return {
      ContentToTable
    }
  }
})
</script>

<style scoped></style>
