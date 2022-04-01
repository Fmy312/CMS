# 项目搭建规范

## 一. 代码规范

### 1.1. 集成 editorconfig 配置

EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。

```yaml
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

VSCode 需要安装一个插件：EditorConfig for VS Code

![image-20210722215138665](https://tva1.sinaimg.cn/large/008i3skNgy1gsq2gh989yj30pj05ggmb.jpg)

### 1.2. 使用 prettier 工具

Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。

1.安装 prettier

```shell
npm install prettier -D
```

2.配置.prettierrc 文件：

- useTabs：使用 tab 缩进还是空格缩进，选择 false；
- tabWidth：tab 是空格的情况下，是几个空格，选择 2 个；
- printWidth：当行字符的长度，推荐 80，也有人喜欢 100 或者 120；
- singleQuote：使用单引号还是双引号，选择 true，使用单引号；
- trailingComma：在多行输入的尾逗号是否添加，设置为 `none`；
- semi：语句末尾是否要加分号，默认值 true，选择 false 表示不加；

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```

3.创建.prettierignore 忽略文件

```
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

4.VSCode 需要安装 prettier 的插件

![image-20210722214543454](https://tva1.sinaimg.cn/large/008i3skNgy1gsq2acx21rj30ow057mxp.jpg)

5.测试 prettier 是否生效

- 测试一：在代码中保存代码；
- 测试二：配置一次性修改的命令；

在 package.json 中配置一个 scripts：

```json
    "prettier": "prettier --write ."
```

### 1.3. 使用 ESLint 检测

1.在前面创建项目的时候，我们就选择了 ESLint，所以 Vue 会默认帮助我们配置需要的 ESLint 环境。

2.VSCode 需要安装 ESLint 插件：

![image-20210722215933360](https://tva1.sinaimg.cn/large/008i3skNgy1gsq2oq26odj30pw05faaq.jpg)

3.解决 eslint 和 prettier 冲突的问题：

安装插件：（vue 在创建项目时，如果选择 prettier，那么这两个插件会自动安装）

```shell
npm i eslint-plugin-prettier eslint-config-prettier -D
```

添加 prettier 插件：

```json
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    'plugin:prettier/recommended'
  ],
```

**.eslintrc.js 的配置为**

```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
}
```

### 1.4. git Husky 和 eslint

虽然我们已经要求项目使用 eslint 了，但是不能保证组员提交代码之前都将 eslint 中的问题解决掉了：

- 也就是我们希望保证代码仓库中的代码都是符合 eslint 规范的；

- 那么我们需要在组员执行 `git commit ` 命令的时候对其进行校验，如果不符合 eslint 规范，那么自动通过规范进行修复；

那么如何做到这一点呢？可以通过 Husky 工具：

- husky 是一个 git hook 工具，可以帮助我们触发 git 提交的各个阶段：pre-commit、commit-msg、pre-push

如何使用 husky 呢？

这里我们可以使用自动配置命令：

```shell
npx husky-init && npm install
```

这里会做三件事：

1.安装 husky 相关的依赖：

![image-20210723112648927](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq0o5jxmj30bb04qwen.jpg)

2.在项目目录下创建 `.husky` 文件夹：

```
npx huksy install
```

![image-20210723112719634](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq16zo75j307703mt8m.jpg)

3.在 package.json 中添加一个脚本：

![image-20210723112817691](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq26phpxj30dj06fgm3.jpg)

接下来，我们需要去完成一个操作：在进行 commit 时，执行 lint 脚本：

![image-20210723112932943](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq3hn229j30nf04z74q.jpg)

这个时候我们执行 git commit 的时候会自动对代码进行 lint 校验。

### 1.5. git commit 规范

#### 1.5.1. 代码提交风格

通常我们的 git commit 会按照统一的风格来提交，这样可以快速定位每次提交的内容，方便之后对版本进行控制。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw17gaqjj30to0cj3zp.jpg)

但是如果每次手动来编写这些是比较麻烦的事情，我们可以使用一个工具：Commitizen

- Commitizen 是一个帮助我们编写规范 commit message 的工具；

  1.安装 Commitizen

```shell
npm install commitizen -D
```

2.安装 cz-conventional-changelog，并且初始化 cz-conventional-changelog：

```shell
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

这个命令会帮助我们安装 cz-conventional-changelog：

![image-20210723145249096](https://tva1.sinaimg.cn/large/008i3skNgy1gsqvz2odi4j30ek00zmx2.jpg)

并且在 package.json 中进行配置：

![](https://tva1.sinaimg.cn/large/008i3skNgy1gsqvzftay5j30iu04k74d.jpg)

这个时候我们提交代码需要使用 `npx cz`：

- 第一步是选择 type，本次更新的类型

| Type     | 作用                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| feat     | 新增特性 (feature)                                                                     |
| fix      | 修复 Bug(bug fix)                                                                      |
| docs     | 修改文档 (documentation)                                                               |
| style    | 代码格式修改(white-space, formatting, missing semi colons, etc)                        |
| refactor | 代码重构(refactor)                                                                     |
| perf     | 改善性能(A code change that improves performance)                                      |
| test     | 测试(when adding missing tests)                                                        |
| build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等）                           |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore    | 变更构建流程或辅助工具(比如更改测试环境)                                               |
| revert   | 代码回退                                                                               |

- 第二步选择本次修改的范围（作用域）

![image-20210723150147510](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8ca15oj30r600wmx4.jpg)

- 第三步选择提交的信息

![image-20210723150204780](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8mq3zlj60ni01hmx402.jpg)

- 第四步提交详细的描述信息

![image-20210723150223287](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw8y05bjj30kt01fjrb.jpg)

- 第五步是否是一次重大的更改

![image-20210723150322122](https://tva1.sinaimg.cn/large/008i3skNgy1gsqw9z5vbij30bm00q744.jpg)

- 第六步是否影响某个 open issue

![image-20210723150407822](https://tva1.sinaimg.cn/large/008i3skNgy1gsqwar8xp1j30fq00ya9x.jpg)

我们也可以在 scripts 中构建一个命令来执行 cz：

![image-20210723150526211](https://tva1.sinaimg.cn/large/008i3skNgy1gsqwc4gtkxj30e207174t.jpg)

#### 1.5.2. 代码提交验证

如果我们按照 cz 来规范了提交风格，但是依然有同事通过 `git commit` 按照不规范的格式提交应该怎么办呢？

- 我们可以通过 commitlint 来限制提交；

  1.安装 @commitlint/config-conventional 和 @commitlint/cli

```shell
npm i @commitlint/config-conventional @commitlint/cli -D
```

2.在根目录创建 commitlint.config.js 文件，配置 commitlint

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

3.使用 husky 生成 commit-msg 文件，验证提交信息：

```shell
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

## 二. 第三方库集成

### 2.1. vue.config.js 配置

vue.config.js 有三种配置方式：

- 方式一：直接通过 CLI 提供给我们的选项来配置：
  - 比如 publicPath：配置应用程序部署的子目录（默认是 `/`，相当于部署在 `https://www.my-app.com/`）；
  - 比如 outputDir：修改输出的文件夹；
- 方式二：通过 configureWebpack 修改 webpack 的配置：
  - 可以是一个对象，直接会被合并；
  - 可以是一个函数，会接收一个 config，可以通过 config 来修改配置；
- 方式三：通过 chainWebpack 修改 webpack 的配置：
  - 是一个函数，会接收一个基于 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 的 config 对象，可以对配置进行修改；

```js
const path = require('path')

module.exports = {
  outputDir: './build',
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       views: '@/views'
  //     }
  //   }
  // }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('views', '@/views')
  }
}
```

### 2.2. vue-router 集成

安装 vue-router 的最新版本：

```shell
npm install vue-router@next
```

创建 router 对象：

```ts
import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: () => import('../views/main/main.vue')
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
```

安装 router：

```ts
import router from './router'

createApp(App).use(router).mount('#app')
```

在 App.vue 中配置跳转：

```html
<template>
  <div id="app">
    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link>
    <router-view></router-view>
  </div>
</template>
```

### 2.3. vuex 集成

安装 vuex：

```shell
npm install vuex@next
```

创建 store 对象：

```ts
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      name: 'coderwhy'
    }
  }
})

export default store
```

安装 store：

```ts
createApp(App).use(router).use(store).mount('#app')
```

在 App.vue 中使用：

```html
<h2>{{ $store.state.name }}</h2>
```

### 2.4. element-plus 集成

Element Plus，一套为开发者、设计师和产品经理准备的基于 Vue 3.0 的桌面端组件库：

- 相信很多同学在 Vue2 中都使用过 element-ui，而 element-plus 正是 element-ui 针对于 vue3 开发的一个 UI 组件库；
- 它的使用方式和很多其他的组件库是一样的，所以学会 element-plus，其他类似于 ant-design-vue、NaiveUI、VantUI 都是差不多的；

安装 element-plus

```shell
npm install element-plus
```

#### 2.4.1. 全局引入

一种引入 element-plus 的方式是全局引入，代表的含义是所有的组件和插件都会被自动注册：

```js
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import router from './router'
import store from './store'

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
```

#### 2.4.2. 局部引入

也就是在开发中用到某个组件对某个组件进行引入：

```vue
<template>
  <div id="app">
    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link>
    <router-view></router-view>

    <h2>{{ $store.state.name }}</h2>

    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'App',
  components: {
    ElButton
  }
})
</script>

<style lang="less"></style>
```

但是我们会发现是没有对应的样式的，引入样式有两种方式：

- 全局引用样式（像之前做的那样）；
- 局部引用样式（通过 babel 的插件）；

  1.安装 babel 的插件：

```shell
npm install babel-plugin-import -D
```

2.配置 babel.config.js

```js
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        customStyleName: (name) => {
          return `element-plus/lib/theme-chalk/${name}.css`
        }
      }
    ]
  ],
  presets: ['@vue/cli-plugin-babel/preset']
}
```

但是这里依然有个弊端：

- 这些组件我们在多个页面或者组件中使用的时候，都需要导入并且在 components 中进行注册；
- 所以我们可以将它们在全局注册一次；

```ts
具体步骤
安装插件
npm install -D unplugin-vue-components unplugin-auto-import
1.
配置vue.config.js
const {defineConfig} = require('@vue/cli-service')

const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        port: 8888
    },
    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ]
    }
})

}
```

### 2.5. axios 集成

安装 axios：

```shell
npm install axios
```

封装 axios：

```ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Result } from './types'
import { useUserStore } from '/@/store/modules/user'

class HYRequest {
  private instance: AxiosInstance

  private readonly options: AxiosRequestConfig

  constructor(options: AxiosRequestConfig) {
    this.options = options
    this.instance = axios.create(options)

    this.instance.interceptors.request.use(
      (config) => {
        const token = useUserStore().getToken
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 拦截响应的数据
        if (res.data.code === 0) {
          return res.data.data
        }
        return res.data
      },
      (err) => {
        return err
      }
    )
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, AxiosResponse<Result<T>>>(config)
        .then((res) => {
          resolve(res as unknown as Promise<T>)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  patch<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
}

export default HYRequest
```

### 2.6. VSCode 配置

```json
{
  "workbench.iconTheme": "vscode-great-icons",
  "editor.fontSize": 17,
  "eslint.migration.2_x": "off",
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "files.autoSave": "afterDelay",
  "editor.tabSize": 2,
  "terminal.integrated.fontSize": 16,
  "editor.renderWhitespace": "all",
  "editor.quickSuggestions": {
    "strings": true
  },
  "debug.console.fontSize": 15,
  "window.zoomLevel": 1,
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "explorer.confirmDragAndDrop": false,
  "workbench.tree.indent": 16,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "editor.wordWrap": "on",
  "path-intellisense.mappings": {
    "@": "${workspaceRoot}/src"
  },
  "hediet.vscode-drawio.local-storage": "eyIuZHJhd2lvLWNvbmZpZyI6IntcImxhbmd1YWdlXCI6XCJcIixcImN1c3RvbUZvbnRzXCI6W10sXCJsaWJyYXJpZXNcIjpcImdlbmVyYWw7YmFzaWM7YXJyb3dzMjtmbG93Y2hhcnQ7ZXI7c2l0ZW1hcDt1bWw7YnBtbjt3ZWJpY29uc1wiLFwiY3VzdG9tTGlicmFyaWVzXCI6W1wiTC5zY3JhdGNocGFkXCJdLFwicGx1Z2luc1wiOltdLFwicmVjZW50Q29sb3JzXCI6W1wiRkYwMDAwXCIsXCIwMENDNjZcIixcIm5vbmVcIixcIkNDRTVGRlwiLFwiNTI1MjUyXCIsXCJGRjMzMzNcIixcIjMzMzMzM1wiLFwiMzMwMDAwXCIsXCIwMENDQ0NcIixcIkZGNjZCM1wiLFwiRkZGRkZGMDBcIl0sXCJmb3JtYXRXaWR0aFwiOjI0MCxcImNyZWF0ZVRhcmdldFwiOmZhbHNlLFwicGFnZUZvcm1hdFwiOntcInhcIjowLFwieVwiOjAsXCJ3aWR0aFwiOjExNjksXCJoZWlnaHRcIjoxNjU0fSxcInNlYXJjaFwiOnRydWUsXCJzaG93U3RhcnRTY3JlZW5cIjp0cnVlLFwiZ3JpZENvbG9yXCI6XCIjZDBkMGQwXCIsXCJkYXJrR3JpZENvbG9yXCI6XCIjNmU2ZTZlXCIsXCJhdXRvc2F2ZVwiOnRydWUsXCJyZXNpemVJbWFnZXNcIjpudWxsLFwib3BlbkNvdW50ZXJcIjowLFwidmVyc2lvblwiOjE4LFwidW5pdFwiOjEsXCJpc1J1bGVyT25cIjpmYWxzZSxcInVpXCI6XCJcIn0ifQ==",
  "hediet.vscode-drawio.theme": "Kennedy",
  "editor.fontFamily": "Source Code Pro, 'Courier New', monospace",
  "editor.smoothScrolling": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "workbench.colorTheme": "Atom One Dark",
  "vetur.completion.autoImport": false,
  "security.workspace.trust.untrustedFiles": "open",
  "eslint.lintTask.enable": true,
  "eslint.alwaysShowStatus": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 三. 接口文档

https://documenter.getpostman.com/view/12387168/TzsfmQvw

baseURL 的值：

```
http://152.136.185.210:5000
```

设置全局 token 的方法：

```js
const res = pm.response.json()
pm.globals.set('token', res.data.token)
```

## 四.项目细节

### 1.vue内部有APP的接口

![image-20220316105619961](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220316105619961.png)

### 2.区分环境变量

#### 1.方法一

![image-20220316113653006](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220316113653006.png)

**process.env.NODE_ENV**

这个变量的值在：

开发环境：development;

生产环境：production

测试环境：test

#### 2.方法二

配置.env的文件

![image-20220316114205634](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220316114205634.png)

文件内部的变量名是有规定的

```
VUE_APP_随便写

BASE_URL

NODD_ENV

MY_NAME
```

![image-20220316114511935](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220316114511935.png)

### 3.axios封装过程的细节

##### 1.axios实例对象的类型

**`instance:AxiosInstance`**

##### instance=aixos.create(config:AxiosRequestConfig)

### 4.在ts环境下获取组件和原生html的ref

默认获取

```ts
//获取loginCount组件
//InstanceType TS内部提供的类型 用来描述该类的实例
//<typeof LoginCount>获取组件的类型
InstanceType<typeof 对应组件>
    //目的是获取一个实例他所对应构造函数的类型 
    let accountRef = ref<InstanceType<typeof LoginCount>>()
 //如
                                  class C{
                                  a:string
                                  b:number
                                  }
                     type T0=InstanceType<typeof C>
                     //<=>
                     type T0=C
                     
                         原生的则为
                         ref<HTMLElement>()
```

一个组件内部导出的对象类似一个类，是这个组件的描述，但是在别的组件使用它时，使用的是根据该组件描述，创建的一个组件实例，且没个使用创建的是不同的实例

```
export default defineComponent({})
```

**并且在ref拿对应组件内的响应变量时，不需要给对应加上value,但是该变量需要在setup里被返回出来**

```ts
pageModalRef.value.DialogVisible = true
```

注意点：

因为setup里的运行时机在mounted之前，故ref不能绑定到相应的组件或者盒子上，关于ref的操作应该运用onMounted让其在dom绑定完成的生命周期钩子里使用

### 5.vuex的操作

需要模块化的时候

```ts
import { Module } from 'vuex'
import { IloginState } from './types'
import { RootState } from '../types'
const login: Module<IloginState, RootState> = {
  namespaced: true,
  state() {
    return {
      userInfo: '',
      token: ''
    }
  },
  getters: {},
  mutations: {},
  actions: {}
}
export { login }
//Module 的泛型中第一个参数对应 本模块的state的类型，第二个参数对应主模块的state类型
```

```ts
export interface IloginState {
  token: string
  userInfo: any
}
```

**vuex里的useStore只能在组件的composition API里才能使用或者在hook里使用 useRoute与useRouter**

### 6.动态路由

#### 1.方法一

不管全部注册

#### 2.方法二

![image-20220322102801564](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220322102801564.png)

**这两种全有弊端**

#### 3.方法三

![image-20220322103406971](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220322103406971.png)

后端返回的数据返回了url，根据返回的url跳转到相应的路由

#### 总结

有一个很重要的点，动态添加的路由可能会因为添加时机导致路径和相对应的路由组件不匹配，导致与not-found组件匹配所有动态路由添加的时机一定要早于app.use(router)(tip:会调用其内部的install方法，并获取当前的路径比如/main/system/user，因为现在router内没有对应的route对象所以会导致路径和组件会不匹配)

![image-20220323144248157](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220323144248157.png)

### 7.动态添加路由引用的工具

借用了**require.context()**

这是webpack内置的函数

```
const routeFile = require.context('../router/main', true, /\.ts$/)
console.log(routeFile.keys()) 返回值如下，每个元素为相对于查看的文件夹的路径
//require.context三个参数 作用是用来将一个文件夹里匹配的所有文件的路径记录出来
//1.匹配的文件夹的地址
//2.是否递归查看
//3.匹配文件夹的正则
再通过require来获取相应路径的文件模块
```

![image-20220322133729923](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220322133729923.png)

### 8.给组件一次性绑定多个属性

v-bind="值"

![image-20220323105649417](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220323105649417.png)

![image-20220323105659612](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220323105659612.png)

**同时需要注意，比如在此组件里 他又一个内置属性 is-range 在配置属性是isRange**

可以将属性一次性绑定到该组件上

### 9.vue3和Props组合以及vue3和TS组合

属性PropType

```vue
props:{
        list:{
            type:Array as PropType<ColumnProps[]>,
            required:true
        }
    }
```

用一句简单的话来说，就是为了类型推论，让我们在使用属性的时候获取更丰富的类型提示，比如在这里我们定义了一个属性 list，使用 vue 默认的 Array，只能确定它是一个数组类型，不能确定数组里面的每一项到底是什么样子的。你在 setup 中，看 props.list 就是一个any数组，但是如果使用PropType <ColumnProps[]> 这个时候，props.list 就变成一个 ColumnProps 的数组，你使用它的时候不论在 ts 中还是模版中都能获得类型的推断和自动补全等等。

**给Props默认值时，若为引用数据类型，则必须为箭头函数**

### 10.双向绑定的细节

1.直接绑定props，此方法比较简单但是这样修改是不符合单项数据流原则的

2.v-model 绑定父组件里的reactive元素 在子组件运用emits修改 看似是正确的但是其本质和方法1是一致的，运用computed方法可以监视出 并未触发emits事件

3.父组件里的元素用ref实现响应式然后v-model此属性 在再子组件里

![image-20220324103506975](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220324103506975.png)

重新赋值一下这个props，然后再进行修改

(tips:const a=ref(...b))可以浅拷贝一个响应式的数据 **深层的化需要遍历了**

### 11.page-content动态插入插槽

```typescript
const OtherPropsSlots = props.ContentToTable?.propList.filter(
      (item: any) => {
        if (
          item.prop == 'status' ||
          item.prop == 'updateAt' ||
          item.prop == 'createAt' ||
          item.prop == 'handler'
        ) {
          return false
        }
        return true
      }
    )
```

![image-20220328145125016](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220328145125016.png)

从总组件里将针对的插槽插入到pageContent里，然后再通过PageContent里的插槽插入Table**里**

### 12.固定ref的类型

ref<在此传入interface或者类型比如string,any,number...>()

### 13.添加动态数据且页面需要刷新

因为setup里的代码只会执行一次，故某些数据绑定到template，在其被修改的时候不会刷新页面，这时可以借用computed来使得页面刷新，从而达到动态添加的效果

### 14.将utc转换为正常时间

![](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220330141555353.png)

因为utc是相对与0时区转换的故要加上一个utcOffset()来偏移时区

### 15.全局导入时还需单独引入组件的情况

当给组件绑定ref时，即使该组件已经全局注册了，但全局注册只能使得在templete里能正常使用，但是在js里仍需要引入

如`ref<InstanceType<typeof ElTree>>()`

### 16.修改element-plus里默认样式的方法

![image-20220331135225664](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220331135225664.png)

![image-20220331135252146](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220331135252146.png)

找到想要修改的样式的父样式，再通过此方法，修改

### 17.vue3.2.0以上的script setup lang="ts"写法

#### 1.定义props

![image-20220331143029404](C:\Users\A.FYYX-2020UTUKHI\AppData\Roaming\Typora\typora-user-images\image-20220331143029404.png)

defineProps和withDefaults结合起来，给props写入类型，以及给与默认值

引入components后不需要在components里注册，直接用
