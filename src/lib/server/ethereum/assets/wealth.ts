import { AGNOSTIC_API_KEY, AGNOSTIC_GRAPHQL_PROXY_ENDPOINT } from '$env/static/private';
import type { GraphQLParams } from '$lib/server/types';

const WALLET_WEALTH_QUERY = /* GraphQL */ `
	query WalletWealthQuery($wallet: String!) {
		wallet_wealth(wallet: $wallet) {
			today_wealth
			yesterday_wealth
		}
	}
`;

type WalletWealthQuery = {
	wallet_wealth?: [
		{
			today_wealth: string;
			yesterday_wealth: string;
		}
	];
};

type WalletWealthVariables = {
	wallet: string;
};

type RequestOptions = {
	fetch: typeof globalThis.fetch;
};

export async function GetWalletWealth(variables: WalletWealthVariables, opts: RequestOptions) {
	const headers = new Headers();
	headers.set('Authorization', AGNOSTIC_API_KEY);
	headers.set('Content-type', 'application/json');
	headers.set('Accept', 'application/json');

	const body: GraphQLParams<WalletWealthVariables> = {
		operationName: 'WalletWealthQuery',
		query: WALLET_WEALTH_QUERY,
		variables
	};

	const response = await opts.fetch(AGNOSTIC_GRAPHQL_PROXY_ENDPOINT, {
		method: 'POST',
		headers,
		body: JSON.stringify(body, null, 2)
	});

	if (!response.ok) {
		console.error(response);
		throw new Error('GetWalletWealth went wrong');
	}

	const json = await response.json();

	if (json.errors) {
		console.error(json.errors);
		throw new Error('GetWalletWealth failed');
	}

	return transform(json.data);
}

function transform(data?: WalletWealthQuery) {
	if (!data?.wallet_wealth) return null;

	const today = parseFloat(data.wallet_wealth[0].today_wealth);
	const yday = parseFloat(data.wallet_wealth[0].yesterday_wealth);
	return {
		value: today,
		delta: today - yday,
		ratio: (today - yday) / yday
	};
}
