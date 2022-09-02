import { createApp } from "vue";
import { createPinia } from "pinia";

import plugin from "@/plugins";

import "@/styles/index.scss";
import "element-plus/theme-chalk/src/message.scss";

import App from "./App.vue";
import router from "./router";

createApp(App).use(createPinia()).use(plugin).use(router).mount("#app");
