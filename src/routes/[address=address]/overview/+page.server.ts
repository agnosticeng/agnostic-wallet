import { GetTokens } from '$lib/server/ethereum/assets/tokens';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	return {
		tokens: await GetTokens({ address: params.address }, { fetch })
	};
}) satisfies PageServerLoad;
