<template>
  <div class="login">
    <loginPannels />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import loginPannels from './cps/login-panels.vue'

export default defineComponent({
  setup() {
    return {}
  },
  components: { loginPannels }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: url('@/assets/img/bg.svg');
}
</style>
