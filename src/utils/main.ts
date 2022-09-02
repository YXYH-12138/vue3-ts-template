export function isDev() {
	return process.env.NODE_ENV === "development";
}

/**
 * await处理函数
 * @param { Promise } promise
 * @param { Object } errorExt -可以传递给err对象的附加信息
 * @return { Promise }
 */
export function awaitTo<T, U = Error>(
	promise: Promise<T>,
	errorExt?: Record<string, any>
): Promise<[U, undefined] | [null, T]> {
	return promise
		.then<[null, T]>((data: T) => [null, data])
		.catch<[U, undefined]>((err: U) => {
			if (errorExt) {
				const parsedError = Object.assign({}, err, errorExt);
				return [parsedError, undefined];
			}

			return [err, undefined];
		});
}

/**
 * 延迟函数
 * @param delay
 * @returns
 */
export async function sleep(delay: number) {
	return new Promise<void>((resolve) => {
		setTimeout(resolve, delay);
	});
}

/**
 * 转换数字
 * @param num
 * @param fractionDigits 保留的小数
 * @param defaultStr 转换失败时返回的默认字符
 * @returns
 */
export function parseNumber(
	num: string | number | undefined,
	fractionDigits?: number,
	defaultStr = "",
	strict = false
): string {
	const type = typeof num;
	if (type == undefined || type == "undefined" || num === "") return defaultStr;
	const newNum = Number(num);
	if (Number.isNaN(newNum)) return num as string;
	if (strict && newNum == 0) return defaultStr;
	return newNum.toFixed(fractionDigits);
}

/**
 * 根据数组对象的某一个key，转成对象
 * @param arr 需要转换的数组
 * @param key 数组对象中的key
 */
export function toObjectByItemKey<T, K extends keyof T>(arr: T[], key: K) {
	const obj: { [Key: string]: T } = {};
	arr.forEach((item) => {
		obj[item[key] as unknown as string] = item;
	});
	return obj;
}

/**
 * 根据字段值排序数组
 * @param data
 * @param fields 字段值数组
 * @param key 字段
 * @returns
 */
export function sortByFields<T extends Array<any>>(
	data: T,
	fields: string[],
	key: keyof T[number]
): T {
	let index = -1;
	const firstList = new Array<T>(fields.length);
	const lastList = new Array<T>();

	data.forEach((item) => {
		index = fields.indexOf(item[key]);
		if (index !== -1) {
			firstList[index] = item;
		} else {
			lastList.push(item);
		}
	});
	return firstList.filter(Boolean).concat(lastList) as T;
}

/**
 * 并发控制函数
 * @param poolLimit 最大并发数量
 * @param iterable 数组，会再函数中回调每一个参数
 * @param iteratorFn 返回Promise的回调函数，会传入iterable的每一项
 * @returns
 */
export function asyncPool<T, P = any>(
	poolLimit: number,
	iterable: T[],
	iteratorFn: (arg: T, array: T[]) => Promise<P>
) {
	let i = 0;
	const ret: any[] = [];
	const executing = new Set();
	const enqueue: () => Promise<void> = function () {
		if (i === iterable.length) {
			return Promise.resolve();
		}
		const item = iterable[i++];
		const p = Promise.resolve().then(() => iteratorFn(item, iterable));
		ret.push(p);
		executing.add(p);
		const clean = () => executing.delete(p);
		p.then(clean).catch(clean);
		let r = Promise.resolve();
		if (executing.size >= poolLimit) {
			r = Promise.race<any>(executing);
		}
		return r.then(() => enqueue());
	};
	return enqueue().then(() => Promise.all(ret));
}
