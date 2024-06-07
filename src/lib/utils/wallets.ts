import { isValidAddress } from './address';

export const WALLETS_COOKIE_NAME = 'wallets';

export function parse(cookie?: string): string[] {
	if (!cookie) return [];

	try {
		const wallets = JSON.parse(cookie);
		if (Array.isArray(wallets) && wallets.every(isValidAddress)) {
			return wallets;
		}
	} catch {
		// ignore
	}

	return [];
}

export function stringify(wallets: string[]) {
	return JSON.stringify(wallets);
}

export function trunc_wallet_address(address: string) {
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
