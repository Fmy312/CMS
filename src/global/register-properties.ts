import { App } from 'vue'
import { FormutcToString } from '@/utils/date-format'
export default function (app: App) {
  app.config.globalProperties.$filters = {
    format(value: string) {
      return FormutcToString(value)
    }
  }
}
