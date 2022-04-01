import { createApp } from 'vue'

import 'normalize.css/normalize.css'
import '@/assets/css/index.less'

import { registerApp } from './global'
import App from './App.vue'
import createIcon from './plugins/createIcon'

import router from './router'
import store from './store'

import { setUpLogin } from '@/store/index'

import PageContent from './components/page-content'
/* import { FRquest } from './service' */

/* interface DataType {
  data: any
  code: number
}
FRquest.request<DataType>({
  url: '/login',
  method: 'post',
  data: {
    name: 'coderwhy',
    password: '123456'
  }
}).then((res) => {
  console.log(res.data, res.code)
}) */
//从本地缓存里将数值取出来

const app = createApp(App)
app.component(PageContent.name, PageContent)
app.use(createIcon)
setUpLogin()
app.use(registerApp).use(store).use(router).mount('#app')
