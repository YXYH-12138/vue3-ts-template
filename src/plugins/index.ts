import { App } from "vue";
// echarts
import "./echarts";
// dayjs
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

/**
 * 加载所有的plugin
 * @param _app 整个应用的实例
 */
export default function (_app: App): void {
	// app.use();
}
