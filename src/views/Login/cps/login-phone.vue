<template>
  <div class="login-phone">
    <el-form
      :rules="rules"
      ref="ruleFormRef"
      :model="message"
      label-position="left"
    >
      <el-form-item label="手机号" prop="phone" label-width="70px">
        <el-input v-model="message.phone" />
      </el-form-item>

      <div class="getcode">
        <el-form-item label="验证码" prop="passCode" label-width="70px">
          <el-input v-model="message.passCode" />
        </el-form-item>
        <el-button type="primary" class="get-bto">获取验证码</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { rules } from '../login-config/Phone'
export default defineComponent({
  name: 'LoginPhone',
  emits: ['changeActive'],
  setup() {
    const message = reactive({
      phone: '',
      passCode: ''
    })
    const ruleFormRef = ref(null)
    return {
      message,
      ruleFormRef,
      rules
    }
  }
})
</script>

<style scoped lang="less">
.getcode {
  display: flex;

  .get-bto {
    margin-left: 8px;
  }
}
</style>
