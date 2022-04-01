import { ref } from 'vue'
import PageContent from '@/components/page-content'
export function usePageSearch() {
  const PageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleResetClick = () => {
    PageContentRef.value?.getPageData({}, false)
  }
  const handleQueryClick = (queryInfo: any) => {
    PageContentRef.value?.getPageData(queryInfo)
  }
  return [PageContentRef, handleQueryClick, handleResetClick]
}
