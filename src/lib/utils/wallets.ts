export const WALLETS_COOKIE_NAME = 'wallets';

// TODO: use zod or a parsing lib
export function parse(raw_cookie?: string) {
	if (typeof raw_cookie !== 'string') return [];
	try {
		const parsed = JSON.parse(raw_cookie);
		if (typeof parsed === 'object' && Array.isArray(parsed)) return parsed as string[];
	} catch {
		// ignore
	}
	return [];
}
