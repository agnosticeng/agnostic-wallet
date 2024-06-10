import { GetTokens } from '$lib/server/ethereum/assets/tokens';
import { GetEvents } from '$lib/server/ethereum/events';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	return {
		tokens: await GetTokens({ address: params.address }, { fetch }),
		events: await GetEvents({ wallet: params.address }, { fetch })
	};
}) satisfies PageServerLoad;
