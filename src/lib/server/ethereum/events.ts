import { AGNOSTIC_API_KEY, AGNOSTIC_GRAPHQL_PROXY_ENDPOINT } from '$env/static/private';
import type { GraphQLParams } from '$lib/server/types';

const GET_EVENTS_QUERY = /* GraphQL */ `
	query GetEventsQuery($wallet: String!) {
		wallet_transfers_history(wallet: $wallet) {
			timestamp
			token_address
			token_symbol
			token_name
			type
			from
			to
			amount
			usd
		}
	}
`;

type GetEventsQuery = {
	wallet_transfers_history?: {
		timestamp: string;
		token_address: string;
		token_symbol: string;
		token_name: string;
		type: string;
		from: string;
		to: string;
		amount: string;
		usd: string;
	}[];
};

type GetEventsVariables = {
	wallet: string;
};

type RequestOptions = {
	fetch: typeof globalThis.fetch;
};

export async function GetEvents(variables: GetEventsVariables, opts: RequestOptions) {
	const headers = new Headers();
	headers.set('Authorization', AGNOSTIC_API_KEY);
	headers.set('Content-type', 'application/json');
	headers.set('Accept', 'application/json');
	headers.set('Cache-control', 'max-age=300');
	headers.set('X-Agnostic-Cache-Refresh-Trigger', '0.5');

	const body: GraphQLParams<GetEventsVariables> = {
		operationName: 'GetEventsQuery',
		query: GET_EVENTS_QUERY,
		variables
	};

	const response = await opts.fetch(AGNOSTIC_GRAPHQL_PROXY_ENDPOINT, {
		method: 'POST',
		headers,
		body: JSON.stringify(body, null, 2)
	});

	if (!response.ok) {
		console.error(response);
		throw new Error('GetEventsQuery went wrong');
	}

	const json = await response.json();

	if (json.errors) {
		console.error(json.errors);
		throw new Error('GetEventsQuery failed');
	}

	return transform(json.data);
}

function transform(data?: GetEventsQuery) {
	if (!data?.wallet_transfers_history?.length) return undefined;
	return data.wallet_transfers_history.map((ev) => ({
		id: toBase64(`${ev.token_address}:${ev.type}:${new Date(ev.timestamp).getTime()}:${ev.amount}`),
		timestamp: new Date(ev.timestamp),
		type: ev.type,
		token: {
			id: ev.token_address,
			address: ev.token_address,
			name: normalize(ev.token_name),
			symbol: normalize(ev.token_symbol)
		},
		from: ev.from,
		to: ev.to,
		value: parseFloat(ev.amount),
		valueInUSD: parseFloat(ev.usd)
	}));
}

export type Transaction = NonNullable<ReturnType<typeof transform>>[number];

function toBase64(str: string) {
	return btoa(str).replace(/(=)*$/, '');
}

function normalize(str: string) {
	return str.replace(/"/g, '');
}
