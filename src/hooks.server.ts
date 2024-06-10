import { isValidAddress } from '$lib/utils/address';
import { WALLETS_COOKIE_NAME, parse } from '$lib/utils/wallets';
import type { Handle } from '@sveltejs/kit';

export const handle = async function ({ event, resolve }) {
	if (event.url.pathname === '/' && event.request.method === 'GET') {
		const [wallet] = parse(event.cookies.get(WALLETS_COOKIE_NAME));

		if (typeof wallet === 'string' && isValidAddress(wallet))
			return new Response(undefined, { status: 307, headers: { location: `/${wallet}` } });
	}

	return resolve(event);
} satisfies Handle;
