export const rules = {
  name: [
    {
      required: true,
      message: '用户名必传',
      trigger: 'blur'
    },
    {
      min: 5,
      max: 10,
      message: '不符合规则',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码必传',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 10,
      message: '不符合规则',
      trigger: 'blur'
    }
  ]
}
