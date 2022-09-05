import { createRouter, createWebHashHistory } from "vue-router";
import { cancelAll } from "@/utils/axios";
import { routeConfig } from "./router";

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes: routeConfig
});

router.beforeEach(() => {
	cancelAll();
	return true;
});

export default router;
