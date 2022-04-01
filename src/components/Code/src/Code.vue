<template>
  <div class="code">
    <pre>
      <code v-html="sourceCode"></code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CoDe',
  props: {
    sourceCode: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.code {
  pre {
    background-color: #ccc;
    padding: 0 10px;
  }
}
</style>
