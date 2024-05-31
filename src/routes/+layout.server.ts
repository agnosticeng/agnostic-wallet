import { GetEstimatedGasPrice } from '$lib/server/ethereum/estimatedGasPrice';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async (e) => {
	try {
		const gas = await GetEstimatedGasPrice({}, { fetch: e.fetch });
		return { gas: gas?.fast };
	} catch (e) {
		console.error(e);
		error(400);
	}
}) satisfies LayoutServerLoad;
