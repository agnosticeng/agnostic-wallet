import { GetEstimatedGasPrice } from '$lib/server/ethereum/estimatedGasPrice';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	try {
		const gas = await GetEstimatedGasPrice({}, { fetch: event.fetch });
		return { gas: Math.round(gas!.fast) };
	} catch (e) {
		console.error(e);
		error(400);
	}
}) satisfies LayoutServerLoad;
