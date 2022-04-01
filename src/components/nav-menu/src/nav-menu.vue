<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-if="!isCollapse">后台管理系统</span>
    </div>
    <el-col>
      <el-menu
        :default-active="defaultId"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        text-color="#b7bdc3"
        background-color="#0c2135"
        active-text-color="#a60bd"
      >
        <template v-for="item in userMenus" :key="item.id">
          <template v-if="item.type === 1">
            <el-sub-menu :index="item.id + ''">
              <template #title>
                <template v-if="item.icon">
                  <el-icon><setting /></el-icon>
                </template>
                <span class="font-style">{{ item.name }}</span>
              </template>
              <template v-for="subItem in item.children" :key="subItem.id">
                <el-menu-item
                  :index="subItem.id + ''"
                  @click="handleMenuItemClick(subItem)"
                >
                  <template #title>
                    <span>{{ subItem.name }}</span>
                  </template>
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <template v-else-if="item.type === 2">
            <el-menu-item :index="item.id + ''">
              <template #title>
                <i v-if="item.icon" :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-col>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { PathMapToMenu } from '@/utils/map-menus'
export default defineComponent({
  name: 'NavMenu',
  props: {
    isCollapse: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  setup() {
    //store操作
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)
    //router操作
    const router = useRouter()

    //刷新页面Menu操作
    let currentPath = useRoute().path
    let menu = PathMapToMenu(userMenus.value, currentPath)
    //data
    const defaultId = ref(menu.id + '')
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }

    return {
      userMenus,
      handleMenuItemClick,
      defaultId
    }
  }
})
</script>

<style lang="less" scoped>
.nav-menu {
  background: #001529;
  height: 100%;

  .logo {
    height: 28px;
    padding: 12px 10px 8px 10px;
    margin-left: -3px;

    img {
      vertical-align: middle;
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
}
.el-sub-menu {
  background-color: #001529 !important;

  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }
  .font-style {
    color: rgb(224, 223, 223) !important;
  }
  el-icon {
    color: rgb(224, 223, 223);
  }
  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
    color: #fff !important;
  }
}

.el-menu-item:hover {
  color: #fff !important;
}

.el-menu-item.is-active {
  color: #fff !important;
  background-color: #0a60bd;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: calc(100% - 48px);
}
.el-menu-vertical-demo {
  border: 0;
}
</style>
