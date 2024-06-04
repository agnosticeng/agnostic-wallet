export const WALLET_COOKIE_NAME = 'wallet';

export function trunc_wallet_address(address: string) {
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
