import { AGNOSTIC_API_KEY, AGNOSTIC_GRAPHQL_PROXY_ENDPOINT } from '$env/static/private';
import type { GraphQLParams } from '$lib/server/types';

export const ASSETS_ETHEREUM_TOKENS_QUERY = /* GraphQL */ `
	query AssetsEthereumTokensQuery($address: String!) {
		assets_ethereum_tokens(wallet: $address) {
			address
			chain
			name
			symbol
			decimals
			current_price
			amount
		}
	}
`;

export type AssetsEthereumTokensQuery = {
	assets_ethereum_tokens?: {
		address: string;
		chain: 'ethereum';
		name: string;
		symbol: string;
		decimals: string;
		current_price: string;
		amount: string;
	}[];
};

export type AssetsEthereumTokensVariables = {
	address: string;
};

type RequestOptions = {
	fetch: typeof globalThis.fetch;
};

export async function GetTokens(variables: AssetsEthereumTokensVariables, opts: RequestOptions) {
	const headers = new Headers();
	headers.set('Authorization', AGNOSTIC_API_KEY);
	headers.set('Content-type', 'application/json');
	headers.set('Accept', 'application/json');

	const body: GraphQLParams<AssetsEthereumTokensVariables> = {
		operationName: 'AssetsEthereumTokensQuery',
		query: ASSETS_ETHEREUM_TOKENS_QUERY,
		variables
	};

	const response = await opts.fetch(AGNOSTIC_GRAPHQL_PROXY_ENDPOINT, {
		method: 'POST',
		headers,
		body: JSON.stringify(body, null, 2)
	});

	if (!response.ok) {
		console.error(response);
		throw new Error('GetTokens went wrong');
	}

	const json = await response.json();

	if (json.errors) {
		console.error(json.errors);
		throw new Error('GetTokens failed');
	}

	return transform(json.data);
}

function transform(data?: AssetsEthereumTokensQuery) {
	return data?.assets_ethereum_tokens?.map((t) => {
		return {
			id: t.address,
			address: t.address,
			chain: t.chain,
			name: normalize(t.name),
			symbol: normalize(t.symbol),
			decimals: parseInt(t.decimals, 10),
			currentPrice: parseFloat(t.current_price),
			amount: {
				unit: parseFloat(t.amount),
				usd: parseFloat(t.amount) * parseFloat(t.current_price)
			}
		};
	});
}

function normalize(str: string) {
	return str.replace(/"/g, '');
}
