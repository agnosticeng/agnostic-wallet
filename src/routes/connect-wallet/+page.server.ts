import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { WALLETS_COOKIE_NAME, parse } from '$lib/utils/wallets';
import { isValidAddress } from '$lib/utils/address';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	enter: async ({ request, cookies }) => {
		const wallets = parse(cookies.get(WALLETS_COOKIE_NAME));

		const data = await request.formData();
		const upcoming = data.get('wallet');

		// TODO: Check if it is a valid wallet address
		if (typeof upcoming !== 'string' || !isValidAddress(upcoming)) {
			return fail(400, { invalid: true });
		}

		if (!wallets.includes(upcoming)) {
			cookies.set(WALLETS_COOKIE_NAME, JSON.stringify(wallets.concat(upcoming)), { path: '/' });
		}

		redirect(303, `/${upcoming}`);
	}
} satisfies Actions;
