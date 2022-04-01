import { ref } from 'vue'
import PageModal from '@/components/page-modale'
type CallBackType = (item?: any) => void
//控制弹窗的出现以及收取弹窗里的数据并且控制某些表单是否出现——绑定defaultInfo的作用时，打开弹窗时，将
//信息自动填充到弹窗里
export function usePageModal(newBc?: CallBackType, EditBc?: CallBackType) {
  const defaultInfo = ref({})
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.DialogVisible = true
    }
    newBc && newBc()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.DialogVisible = true
    }
    EditBc && EditBc(item)
  }
  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
