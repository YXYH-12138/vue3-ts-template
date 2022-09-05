import axios from "axios";
import { ref, ShallowRef, shallowRef } from "vue";
import type { AxiosRequestConfig, AxiosInstance, CancelToken, CancelTokenSource } from "axios";

type Request = (...args: any[]) => Promise<any>;
type RequestReturn<T extends (...args: any[]) => Promise<any>> = Unpromisify<ReturnType<T>>;

type Options<P = any> = {
	defaultParams?: P;
	defaultData?: any;
	manual?: boolean;
};

const cancelMap = new Map<CancelToken, CancelTokenSource>();

/**
 * 取消全部请求
 */
export function cancelAll() {
	cancelMap.forEach((source) => source.cancel());
	cancelMap.clear();
}

/**
 * 设置取消请求的token
 * @param axiosInstance
 */
function setCancelToken(axiosInstance: AxiosInstance) {
	axiosInstance.interceptors.request.use((config) => {
		const source = axios.CancelToken.source();
		if (!config.cancelToken && !config.cancelIgnore) {
			config.cancelToken = source.token;
			cancelMap.set(source.token, source);
		}
		return config;
	});
	// 请求结束，删除保存的token
	axiosInstance.interceptors.response.use((response) => {
		const { config } = response;
		if (config.cancelToken) {
			cancelMap.delete(config.cancelToken);
		}
		return response;
	});
}

export function createRequest<T extends Request>(requestFn: T, options?: Options<Parameters<T>>) {
	const loading = ref(false);
	const data = shallowRef(options?.defaultData) as ShallowRef<RequestReturn<T>>;

	const run = function (...args: Parameters<T>): Promise<RequestReturn<T>> {
		loading.value = true;
		return requestFn(...(args.length ? args : options?.defaultParams ?? []))
			.then((response) => {
				data.value = response;
				return response;
			})
			.finally(() => {
				loading.value = false;
			});
	};

	if (!options?.manual) {
		(run as T)();
	}

	return {
		loading,
		data,
		run
	};
}

export function createAxios(config: AxiosRequestConfig) {
	const axiosInstance = axios.create({ ...config });
	setCancelToken(axiosInstance);
	return axiosInstance;
}
