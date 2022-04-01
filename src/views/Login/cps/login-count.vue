<template>
  <div class="login-count">
    <el-form
      :rules="rules"
      ref="ruleFormRef"
      :model="message"
      label-position="left"
    >
      <el-form-item label="用户名" prop="count" label-width="70px">
        <el-input v-model="message.name" placeholder="Please input count" />
      </el-form-item>

      <div class="getcode">
        <el-form-item label="密码" prop="password" label-width="70px">
          <el-input
            v-model="message.password"
            type="password"
            placeholder="Please input password"
            show-password
          />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from 'vue'

import type { ElForm } from 'element-plus'
import { useStore } from 'vuex'

import { rules } from '../login-config/Count'
import Cache from '@/utils/cache'

export default defineComponent({
  name: 'LoginCount',
  setup() {
    const store = useStore()

    const message = reactive({
      name: Cache.getCache('name') ?? '',
      password: Cache.getCache('password') ?? ''
    })

    const ruleFormRef = ref<InstanceType<typeof ElForm>>()
    function loginAction(isKeepPassword: boolean) {
      /* 是否为记住密码 */
      if (isKeepPassword) {
        ruleFormRef.value?.validate((valid) => {
          /* editor.formatOnSave */
          if (valid) {
            Cache.setCache('name', message.name)
            Cache.setCache('password', message.password)
          }
        })
      }
      /* 开始进行登录操作 */

      store.dispatch('login/actionsLoginAction', toRaw(message))
    }
    return {
      message,
      rules,
      ruleFormRef,
      loginAction
    }
  }
})
</script>

<style scoped lang="less"></style>
