import { createApp } from "vue";
import { createPinia } from "pinia";

import plugin from "@/plugins";

import App from "./App.vue";
import router from "./router";

import "@/styles/index.scss";

createApp(App).use(createPinia()).use(plugin).use(router).mount("#app");
