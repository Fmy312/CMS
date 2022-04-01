import { IBreadCrumb } from '@/base-ui/breadcrumb'
import type { RouteRecordRaw } from 'vue-router'
export let firstMenu: any
//动态创建路由
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  //先默认加载所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFile = require.context('../router/main', true, /\.ts$/)
  routeFile.keys().forEach((url) => {
    const route = require('../router/main' + url.split('.')[1])
    allRoutes.push(route.default)
  })

  //根据userMenus获取需要添加的routes
  const _recurseRoutes = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type == 2) {
        const route = allRoutes.find((route) => route.path == menu.url)
        if (route) {
          routes.push(route)
        }
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseRoutes(menu.children)
      }
    }
  }
  _recurseRoutes(userMenus)
  return routes
}
export function PathMapBreadCrumbs(
  userMenu: any[],
  currentPath: string
): IBreadCrumb[] {
  const breadcrums: IBreadCrumb[] = []
  PathMapToMenu(userMenu, currentPath, breadcrums)
  return breadcrums
}
//找到相应路径用来改变其nav-aside的样式
export function PathMapToMenu(
  Menu: any[],
  path: string,
  breadcrums?: IBreadCrumb[]
): any {
  for (const menu of Menu) {
    if (menu.type == 1) {
      const find = PathMapToMenu(menu.children, path)
      if (find) {
        breadcrums?.push({ name: menu.name })
        breadcrums?.push({ name: find.name })
        return find
      }
    } else if (menu.type == 2 && menu.url === path) {
      return menu
    }
  }
}
//获取相应的权限
export function mapMenusToPermission(userMenus: any[]): string[] {
  const permission: string[] = []
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type == 1 || menu.type == 2) {
        _recurseGetPermission(menu.children ?? [])
      } else {
        permission.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permission
}
//找到Roles里的叶子权限
export function getMenuLeafKeys(meauList: any[]): number[] {
  const leftKeys: number[] = []

  const _recurseCountNode = (item: any) => {
    for (const node of item) {
      if (node['children']) {
        _recurseCountNode(node['children'])
      } else {
        leftKeys.push(node.id)
      }
    }
  }
  _recurseCountNode(meauList)

  return leftKeys
}
