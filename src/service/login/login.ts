import { FRquest } from '../index'
import { IAccount, LoginResult, IDataType } from './type'
enum AccountApi {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/' //  /role/1/menu
}
export function FAccountLogin(account: IAccount) {
  return FRquest.post<IDataType<LoginResult>>({
    url: AccountApi.AccountLogin,
    data: account
  })
}
export function requestUserInfo(id: number) {
  return FRquest.get<IDataType>({
    url: AccountApi.LoginUserInfo + id
  })
}
export function requestUserMens(id: number) {
  return FRquest.get<IDataType>({
    url: AccountApi.UserMenus + id + '/menu'
  })
}
