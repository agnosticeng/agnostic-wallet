import type { PageServerLoad } from './$types';

export const load = (async (e) => {
	return { address: e.params.address };
}) satisfies PageServerLoad;
