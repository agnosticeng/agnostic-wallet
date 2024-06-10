import { GetEstimatedGasPrice } from '$lib/server/ethereum/estimatedGasPrice';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	try {
		event.depends('gas:price');
		const gas = await GetEstimatedGasPrice({}, { fetch: event.fetch });
		return { gas };
	} catch (e) {
		console.error(e);
		error(400);
	}
}) satisfies LayoutServerLoad;
