import { IloginState } from './login/types'
import { ISystemState } from './main/system/types'
import { IdashBoardState } from './main/analysis/types'
export interface RootState {
  token?: string
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}
export interface IRootWithModules {
  login: IloginState
  system: ISystemState
  dashboard: IdashBoardState
}
export type IStoreType = RootState & IRootWithModules
