<template>
  <!-- target 父盒子 位置 -->
  <div class="backtop">
    <el-backtop :bottom="100" :target="TarN" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    target: {
      type: Object,
      require: true
    }
  },
  setup(props) {
    const TarN = computed(() => {
      return '.' + props.target
    })
    return { TarN }
  }
})
</script>

<style lang="less" scoped>
.backtop {
  width: 50px;
  height: 50px;
}
</style>
