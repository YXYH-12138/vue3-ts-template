import axios from "axios";
import type { AxiosRequestConfig, AxiosInstance, Canceler } from "axios";

const serviceCache: Service[] = [];

export class Service {
	public readonly axiosInstance: AxiosInstance;
	public readonly config?: AxiosRequestConfig;
	// 保存取消请求的方法
	private cancelers: Canceler[] = [];

	public get url() {
		return this.config?.url || "";
	}

	constructor(config: AxiosRequestConfig) {
		this.config = config;
		this.axiosInstance = axios.create(config);
		this.axiosInstance.interceptors.request.use(this.setCancelToken.bind(this));
	}

	/**
	 * 设置取消请求的token
	 */
	private setCancelToken(config: AxiosRequestConfig) {
		if (!config.cancelToken && !config.cancelIgnore) {
			config.cancelToken = new axios.CancelToken((cancel) => {
				this.cancelers.push(cancel);
			});
		}
		return config;
	}

	/**
	 * 取消所有请求
	 */
	public cancelAll() {
		const { cancelers } = this;
		cancelers.forEach((canceler) => canceler());
		cancelers.length = 0;
	}
}

export function cancelAll() {
	serviceCache.forEach((service) => service.cancelAll());
}

export function createAxios(config: AxiosRequestConfig) {
	const service = new Service(config);
	serviceCache.push(service);
	return service;
}
