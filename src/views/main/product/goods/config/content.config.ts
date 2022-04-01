export const ContentToTable = {
  title: '商品列表',
  showSelect: true,
  showIndex: true,
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '120' },
    { prop: 'oldPrice', label: '原价', minWidth: '80' },
    { prop: 'newPrice', label: '现价', minWidth: '80' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '90', slotName: 'image' },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    { prop: 'handler', label: '操作', minWidth: '120', slotName: 'handler' }
  ]
}
