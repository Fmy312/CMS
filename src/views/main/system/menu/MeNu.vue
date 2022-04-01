<template>
  <div>
    <page-content
      :ContentToTable="ContentToTable"
      pageName="/menu"
      header="新建菜单"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ContentToTable } from './config/content.config'

export default defineComponent({
  setup() {
    return { ContentToTable }
  }
})
</script>

<style scoped></style>
