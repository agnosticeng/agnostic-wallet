import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { WALLETS_COOKIE_NAME, parse, stringify } from '$lib/utils/wallets';
import { isValidAddress } from '$lib/utils/address';
import { GetExploreTokens } from '$lib/server/ethereum/exploreTokens';

export const load = (async (e) => {
	return {
		tokens: await GetExploreTokens({}, { fetch: e.fetch })
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	enter: async ({ request, cookies }) => {
		const wallets = parse(cookies.get(WALLETS_COOKIE_NAME));
		const data = await request.formData();
		const upcoming = data.get('wallet');

		if (typeof upcoming !== 'string' || !isValidAddress(upcoming)) {
			return fail(400, { invalid: true });
		}

		if (wallets.indexOf(upcoming) === -1)
			cookies.set(WALLETS_COOKIE_NAME, stringify([upcoming, ...wallets]), { path: '/' });
	},
	remove: async ({ request, cookies }) => {
		const data = await request.formData();
		const upcoming = data.get('wallet');

		if (!upcoming) {
			cookies.delete(WALLETS_COOKIE_NAME, { path: '/' });
			return;
		}

		if (typeof upcoming !== 'string' || !isValidAddress(upcoming)) {
			return fail(400, { invalid: true });
		}

		const wallets = parse(cookies.get(WALLETS_COOKIE_NAME));

		const index = wallets.indexOf(upcoming);
		if (index > -1) {
			wallets.splice(index, 1);
		}

		cookies.set(WALLETS_COOKIE_NAME, stringify(wallets), { path: '/' });
	}
};
