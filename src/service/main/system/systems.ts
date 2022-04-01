import { FRquest } from '@/service'
import { IDataType } from '@/service/login/type'
import { SystemResult } from './types'

export function getPagesListData(url: string, Pagequery: any) {
  return FRquest.post<IDataType<SystemResult>>({
    url,
    data: Pagequery
  })
}
//url:/users/id
export function DeletePageData(url: string) {
  return FRquest.delete<IDataType>({
    url
  })
}

export function createPageData(url: string, queryInfo: any) {
  return FRquest.post<IDataType>({
    url,
    data: queryInfo
  })
}
export function EditPageData(url: string, queryInfo: any) {
  return FRquest.patch<IDataType>({
    url,
    data: queryInfo
  })
}
