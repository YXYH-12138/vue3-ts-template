// 提取数组子元素
declare type Flatten<T> = T extends (infer U)[] ? U : T;
// 提取 Promise 值
declare type Unpromisify<T> = T extends Promise<infer R> ? R : T;

declare type AnyFunction = (...arg: any[]) => any;

/** 扩展process.env */
declare namespace __WebpackModuleApi {
	interface NodeProcess {
		env: {
			/** 页面标题 */
			VUE_APP_TITLE: string;
			/* 生产环境接口地址 */
			VUE_APP_API: string;
			[Key: string]: any;
		};
	}
}

type CSSModuleClasses = { readonly [key: string]: string };

declare module "*.module.css" {
	const classes: CSSModuleClasses;
	export default classes;
}
declare module "*.module.less" {
	const classes: CSSModuleClasses;
	export default classes;
}
declare module "*.module.scss" {
	const classes: CSSModuleClasses;
	export default classes;
}
declare module "*.module.sass" {
	const classes: CSSModuleClasses;
	export default classes;
}
