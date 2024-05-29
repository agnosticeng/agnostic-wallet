import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	redirect(307, `/${params.address}/overview`);
}) satisfies PageLoad;
