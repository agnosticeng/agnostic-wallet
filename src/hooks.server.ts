import { parse } from '$lib/utils/wallets';
import type { Handle } from '@sveltejs/kit';

export const handle = async function ({ event, resolve }) {
	if (event.url.pathname === '/') {
		const [wallet] = parse(event.cookies.get('wallets'));

		if (!wallet)
			return new Response(undefined, { status: 307, headers: { location: '/connect-wallet' } });

		return new Response(undefined, { status: 307, headers: { location: `/${wallet}` } });
	}

	return resolve(event);
} satisfies Handle;
