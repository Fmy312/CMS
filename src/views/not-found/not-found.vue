<template>
  <div class="div">
    <el-button type="primary" @click="back">
      无此页面，点击返回上一个页面</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const back = () => {
      router.back()
    }
    return {
      back
    }
  }
})
</script>

<style scoped>
.div {
  position: absolute;
  width: 200px;
  height: 100px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>
