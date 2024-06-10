import { AGNOSTIC_API_KEY, AGNOSTIC_GRAPHQL_PROXY_ENDPOINT } from '$env/static/private';
import type { GraphQLParams } from '$lib/server/types';

const EXPLORE_TOKENS_QUERY = /* GraphQL */ `
	query GetExploreTokensQuery {
		explore_tokens {
			address
			name
			symbol
			decimals
			current_price
		}
	}
`;

type GetExploreTokensQuery = {
	explore_tokens?: {
		address: string;
		name: string;
		symbol: string;
		decimals: string;
		current_price: string;
	}[];
};

type GetExploreTokensVariables = Record<string, never>;

type RequestOptions = {
	fetch: typeof globalThis.fetch;
};

export async function GetExploreTokens(variables: GetExploreTokensVariables, opts: RequestOptions) {
	const headers = new Headers();
	headers.set('Authorization', AGNOSTIC_API_KEY);
	headers.set('Content-type', 'application/json');
	headers.set('Accept', 'application/json');
	headers.set('Cache-control', 'max-age=3600');
	headers.set('X-Agnostic-Cache-Refresh-Trigger', '0.8');

	const body: GraphQLParams<GetExploreTokensVariables> = {
		operationName: 'GetExploreTokensQuery',
		query: EXPLORE_TOKENS_QUERY,
		variables
	};

	const response = await opts.fetch(AGNOSTIC_GRAPHQL_PROXY_ENDPOINT, {
		method: 'POST',
		headers,
		body: JSON.stringify(body, null, 2)
	});

	if (!response.ok) {
		console.error(response);
		throw new Error('GetExploreTokens went wrong');
	}

	const json = await response.json();

	if (json.errors) {
		console.error(json.errors);
		throw new Error('GetExploreTokens failed');
	}

	return transform(json.data);
}

function transform(data?: GetExploreTokensQuery) {
	if (!data?.explore_tokens?.length) return [];

	return data.explore_tokens.map((t) => ({
		id: t.address,
		address: t.address,
		name: normalize(t.name),
		symbol: normalize(t.symbol),
		decimals: parseInt(t.decimals, 10),
		price: parseFloat(t.current_price)
	}));
}

function normalize(str: string) {
	return str.replace(/"/g, '');
}
