import * as gas_service from '$lib/server/gas';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	try {
		const gas = await gas_service.request();
		return { gas: gas.avg };
	} catch (e) {
		console.error(e);
		error(400);
	}
}) satisfies LayoutServerLoad;
