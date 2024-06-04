import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { WALLET_COOKIE_NAME } from '$lib/utils/wallets';
import { isValidAddress } from '$lib/utils/address';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const upcoming = data.get('wallet');

		// TODO: Check if it is a valid wallet address
		if (typeof upcoming !== 'string' || !isValidAddress(upcoming)) {
			return fail(400, { invalid: true });
		}

		cookies.set(WALLET_COOKIE_NAME, upcoming, { path: '/' });

		redirect(303, `/${upcoming}`);
	}
};
