import { error } from '@sveltejs/kit';
import { isValidAddress } from '$lib/utils/address';
import type { LayoutServerLoad } from './$types';

export const load = (async (e) => {
	if (!isValidAddress(e.params.address)) error(400, 'Invalid address provided');

	return { address: e.params.address };
}) satisfies LayoutServerLoad;
