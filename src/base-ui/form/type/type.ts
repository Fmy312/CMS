type FormType = 'input' | 'password' | 'select' | 'datepicker'
type FormOptions = { label: string; value: number; disabled?: boolean }

export interface IFormItem {
  filed: string
  type: FormType
  placeholder?: any
  label?: string
  rules?: any[]
  options?: FormOptions[]
  OtherOptions?: any
  isHidden?: boolean
}
export interface IForm {
  //每个表单的类型及其属性
  FormItems: IFormItem[]
  //决定每个标签名所在盒子的宽度
  labelWidth?: string
  //动态决定Form组件里的样式
  ItemStyle?: any
  //响应式控制
  colLayout?: object
}
