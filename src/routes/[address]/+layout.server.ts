import { error } from '@sveltejs/kit';
import { isValidAddress } from 'ethereumjs-util';
import type { LayoutServerLoad } from './$types';

export const load = (async (e) => {
	if (!isValidAddress(e.params.address)) error(400, 'Invalid wallet address provided');

	return { address: e.params.address as `0x${string}` };
}) satisfies LayoutServerLoad;
