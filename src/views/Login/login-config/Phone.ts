export const rules = {
  phone: [
    {
      required: true,
      message: '必传项目',
      trigger: 'blur'
    },
    {
      min: 11,
      max: 11,
      message: '不符合规则',
      trigger: 'blur'
    }
  ],
  passCode: [
    {
      required: true,
      message: '密码必传',
      trigger: 'blur'
    },
    {
      min: 5,
      max: 5,
      message: '验证码必须',
      trigger: 'blur'
    }
  ]
}
