export function throttle<TArgs extends unknown[]>(fn: (...args: TArgs) => void, wait = 0) {
	let timeoutId: ReturnType<typeof setTimeout>;
	let inThrottle = false;
	let lastTimeExecution: number = 0;
	return function (...args: TArgs) {
		if (inThrottle) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(
				() => {
					if (Date.now() - lastTimeExecution >= wait) {
						// @ts-expect-error this error
						fn.apply(this, args);
						lastTimeExecution = Date.now();
					}
				},
				Math.max(wait - (Date.now() - lastTimeExecution), 0)
			);
		} else {
			// @ts-expect-error this error
			fn.apply(this, args);
			lastTimeExecution = Date.now();
			inThrottle = true;
		}
	};
}

export function debounce<TArgs extends unknown[]>(fn: (...args: TArgs) => void, ms = 0) {
	let timeoutId: ReturnType<typeof setTimeout>;
	return function (...args: TArgs) {
		clearTimeout(timeoutId);
		// @ts-expect-error this error
		timeoutId = setTimeout(() => fn.apply(this, args), ms);
	};
}
