import { IForm } from '@/base-ui'
export const FormConfig: IForm = {
  labelWidth: '100px',
  ItemStyle: { padding: '10px 40px' },
  FormItems: [
    {
      filed: 'id',
      type: 'input',
      label: 'id',
      placeholder: '请输入id'
    },
    {
      filed: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      filed: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      filed: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      filed: 'enable',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '禁用',
          value: 0
        }
      ]
    },
    {
      filed: 'createAt',
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
