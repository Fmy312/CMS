import { useStore } from '@/store'

export function userPermission(pageName: string, handleName: string) {
  const store = useStore()
  pageName = pageName.slice(1)
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`
  return !!permissions?.find((item) => item == verifyPermission)
}
