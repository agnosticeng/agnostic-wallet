import { error } from '@sveltejs/kit';
import { isValidAddress } from '$lib/utils/address';
import type { LayoutServerLoad } from './$types';
import { WALLET_COOKIE_NAME } from '$lib/utils/wallets';
import { GetWalletWealth } from '$lib/server/ethereum/assets/wealth';

export const load = (async (e) => {
	if (!isValidAddress(e.params.address)) error(400, 'Invalid address provided');
	const isFavorite = e.cookies.get(WALLET_COOKIE_NAME) === e.params.address;

	const wealth = await GetWalletWealth({ wallet: e.params.address }, { fetch: e.fetch });
	return { address: e.params.address, isFavorite, wealth };
}) satisfies LayoutServerLoad;
