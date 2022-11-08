import { createApp } from "vue"
import App from "./App.vue"

import api from "./plugins/api"
import alert from "./plugins/alert"

import ElementPlus from "element-plus"

// 引入全局的样式文件
import "./assets/main.css"
// 引入 alert 的样式文件
import "./assets/alert.css"
// Element 的样式文件
import "element-plus/dist/index.css"

const app = createApp(App)

// 绑定到 app 的实例上
app.use(api)
app.use(alert)
app.use(ElementPlus)

// 挂载
app.mount("#app")
