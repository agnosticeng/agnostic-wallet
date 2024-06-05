import { error } from '@sveltejs/kit';
import { isValidAddress } from '$lib/utils/address';
import type { LayoutServerLoad } from './$types';
import { WALLET_COOKIE_NAME } from '$lib/utils/wallets';

export const load = (async (e) => {
	if (!isValidAddress(e.params.address)) error(400, 'Invalid address provided');
	const isFavorite = e.cookies.get(WALLET_COOKIE_NAME) === e.params.address;
	return { address: e.params.address, isFavorite };
}) satisfies LayoutServerLoad;
