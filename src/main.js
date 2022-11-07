import { createApp } from "vue"
import App from "./App.vue"

// 引入全局的样式文件
import "./assets/main.css"

import api from "./plugins/api"

const app = createApp(App)

// 绑定到 app 的实例上
app.use(api)

// 挂载
app.mount("#app")
