<template>
  <div class="login-panels">
    <h1>后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" v-model="currentTab" stretch>
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><avatar /></el-icon>
            <span class="title">账号登录</span>
          </span>
        </template>
        <div><login-count ref="accountRef" /></div>
      </el-tab-pane>
      <el-tab-pane label="Config" name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><phone /></el-icon>
            <span class="title">手机登录</span>
          </span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <div class="remeber">
      <el-checkbox label="记住密码" size="small" v-model="isKeepPassword" />
      <el-link type="primary" style="font-size: 12px" :underline="false"
        >忘记密码</el-link
      >
    </div>
    <el-button type="primary" class="button" @click="handleLoginClick"
      >登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginCount from './login-count.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  name: 'LoginPanel',
  setup() {
    let currentTab = ref('account')
    let isKeepPassword = ref(true)
    let accountRef = ref<InstanceType<typeof LoginCount>>()
    function handleLoginClick() {
      if (currentTab.value == 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log(999)
      }
    }
    return {
      isKeepPassword,
      handleLoginClick,
      accountRef,
      currentTab
    }
  },
  components: {
    LoginCount,
    LoginPhone
  }
})
</script>

<style scoped lang="less">
.login-panels {
  margin-bottom: 150px;
  width: 320px;
  h1 {
    margin-left: 40%;
    transform: translateX(-40%);
  }

  title {
    text-align: center;
  }
  .remeber {
    display: flex;
    justify-content: space-between;
  }
  .button {
    width: 100%;
  }
}
</style>
