import { error } from '@sveltejs/kit';
import { isValidAddress } from '$lib/utils/address';
import type { LayoutServerLoad } from './$types';
import { WALLETS_COOKIE_NAME, parse } from '$lib/utils/wallets';
import { GetWalletWealth } from '$lib/server/ethereum/assets/wealth';

export const load = (async (e) => {
	if (!isValidAddress(e.params.address)) error(400, 'Invalid address provided');

	const wealth = await GetWalletWealth({ wallet: e.params.address }, { fetch: e.fetch });
	return {
		address: e.params.address,
		wealth,
		addresses: parse(e.cookies.get(WALLETS_COOKIE_NAME))
	};
}) satisfies LayoutServerLoad;
