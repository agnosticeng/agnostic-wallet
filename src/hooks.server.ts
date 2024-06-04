import { isValidAddress } from '$lib/utils/address';
import { WALLET_COOKIE_NAME } from '$lib/utils/wallets';
import type { Handle } from '@sveltejs/kit';

export const handle = async function ({ event, resolve }) {
	if (event.url.pathname === '/' && event.request.method === 'GET') {
		const wallet = event.cookies.get(WALLET_COOKIE_NAME);

		if (typeof wallet === 'string' && isValidAddress(wallet))
			return new Response(undefined, { status: 307, headers: { location: `/${wallet}` } });
		else event.cookies.delete(WALLET_COOKIE_NAME, { path: '/' });
	}

	return resolve(event);
} satisfies Handle;
