import { IForm } from '@/base-ui'
export const FormConfig: IForm = {
  labelWidth: '100px',
  FormItems: [
    {
      filed: 'name',
      type: 'input',
      label: '角色名称',
      placeholder: '请输入用角色名'
    },
    {
      filed: 'intro',
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入权限介绍'
    },
    {
      filed: 'creatTime',
      type: 'datepicker',
      label: '创建时间',
      OtherOptions: {
        isRange: true,
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        rangeSeparator: 'To',
        type: 'daterange',
        unlinkpanels: true
      }
    }
  ],
  colLayout: { xl: 6, lg: 8, md: 12, sm: 24, xs: 24 }
}
