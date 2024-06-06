import { GetEvents } from '$lib/server/ethereum/events';
import type { PageServerLoad } from './$types';

export const load = (async (e) => {
	return {
		history: await GetEvents({ wallet: e.params.address }, { fetch: e.fetch })
	};
}) satisfies PageServerLoad;
