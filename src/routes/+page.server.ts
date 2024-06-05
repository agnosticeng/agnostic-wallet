import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { WALLET_COOKIE_NAME } from '$lib/utils/wallets';
import { isValidAddress } from '$lib/utils/address';
import { GetExploreTokens } from '$lib/server/ethereum/exploreTokens';

export const load = (async (e) => {
	return {
		tokens: await GetExploreTokens({}, { fetch: e.fetch })
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	enter: async ({ request, cookies }) => {
		const data = await request.formData();
		const upcoming = data.get('wallet');

		// TODO: Check if it is a valid wallet address
		if (typeof upcoming !== 'string' || !isValidAddress(upcoming)) {
			return fail(400, { invalid: true });
		}

		cookies.set(WALLET_COOKIE_NAME, upcoming, { path: '/' });

		redirect(303, `/${upcoming}`);
	},
	remove: async ({ cookies }) => {
		cookies.delete(WALLET_COOKIE_NAME, { path: '/' });
	}
};
