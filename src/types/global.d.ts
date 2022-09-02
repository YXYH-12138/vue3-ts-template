declare global {
	interface Window {
		// 在此扩展Window接口
		foo: number;
	}

	/** process.env */
	namespace NodeJS {
		interface ProcessEnv {
			/** 页面标题 */
			VUE_APP_TITLE: string;
			/* 生产环境接口地址 */
			VUE_APP_API: string;
			BASE_URL: string;
			[Key: string]: any;
		}
	}
}

export {};
