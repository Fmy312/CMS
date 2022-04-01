import type { App } from 'vue'
import { registerElement } from './register-Element'
import registerProperties from './register-properties'

export function registerApp(app: App): void {
  app.use(registerElement)
  app.use(registerProperties)
}
