import {
  Cellphone,
  Avatar,
  Phone,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Fold,
  Expand,
  ArrowDown,
  Search,
  Loading,
  Delete,
  Edit
} from '@element-plus/icons-vue'
const components = [
  Cellphone,
  Avatar,
  Phone,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Fold,
  Expand,
  ArrowDown,
  Search,
  Loading,
  Delete,
  Edit
]
import { App } from 'vue'
// 统一注册el-icon图标
export default function (app: App) {
  for (const iconName of components) {
    app.component(iconName.name, iconName)
  }
}
