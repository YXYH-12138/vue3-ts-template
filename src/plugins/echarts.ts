import * as echarts from "echarts/core";
import {
	BarChart,
	BarSeriesOption,
	LineChart,
	LineSeriesOption,
	PieChart,
	PieSeriesOption
} from "echarts/charts";
import {
	TitleComponent,
	GridComponent,
	TooltipComponent,
	LegendComponent,
	DatasetComponent,
	MarkLineComponent,
	// 组件类型的定义后缀都为 ComponentOption
	TitleComponentOption,
	MarkLineComponentOption,
	GridComponentOption,
	TooltipComponentOption,
	LegendComponentOption,
	DatasetComponentOption
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
	| BarSeriesOption
	| LineSeriesOption
	| TitleComponentOption
	| GridComponentOption
	| TooltipComponentOption
	| LegendComponentOption
	| PieSeriesOption
	| DatasetComponentOption
	| MarkLineComponentOption
>;

// 注册必须的组件
echarts.use([
	TitleComponent,
	LegendComponent,
	TooltipComponent,
	DatasetComponent,
	GridComponent,
	LineChart,
	BarChart,
	PieChart,
	CanvasRenderer,
	MarkLineComponent
]);
