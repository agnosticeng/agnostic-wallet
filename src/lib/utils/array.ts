// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function groupBy<T, F extends (item: T, index: number) => any>(
	arr: T[],
	predicate: F
): Map<ReturnType<F>, T[]> {
	return arr.reduce((map, k, i) => {
		const key = predicate(k, i);
		const group = map.get(key) ?? [];

		return map.set(key, [...group, k]);
	}, new Map<ReturnType<F>, T[]>());
}
