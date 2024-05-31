import { AGNOSTIC_API_KEY, AGNOSTIC_GRAPHQL_PROXY_ENDPOINT } from '$env/static/private';
import type { GraphQLParams } from '$lib/server/types';

const GET_ESTIMATED_GAS_PRICE_QUERY = /* GraphQL */ `
	query GetEstimatedGasPriceQuery {
		estimated_gas_price {
			base_fee
			mean
			fast
		}
	}
`;

type GetEstimatedGasPriceQuery = {
	estimated_gas_price?: [
		{
			base_fee: string;
			mean: string;
			fast: string;
		}
	];
};

type GetEstimatedGasPriceVariables = Record<string, never>;

type RequestOptions = {
	fetch: typeof globalThis.fetch;
};

export async function GetEstimatedGasPrice(
	variables: GetEstimatedGasPriceVariables,
	opts: RequestOptions
) {
	const headers = new Headers();
	headers.set('Authorization', AGNOSTIC_API_KEY);
	headers.set('Content-type', 'application/json');
	headers.set('Accept', 'application/json');
	headers.set('Cache-control', 'no-cache');

	const body: GraphQLParams<GetEstimatedGasPriceVariables> = {
		operationName: 'GetEstimatedGasPriceQuery',
		query: GET_ESTIMATED_GAS_PRICE_QUERY,
		variables
	};

	const response = await opts.fetch(AGNOSTIC_GRAPHQL_PROXY_ENDPOINT, {
		method: 'POST',
		headers,
		body: JSON.stringify(body, null, 2)
	});

	if (!response.ok) {
		console.error(response);
		throw new Error('GetEstimatedGasPrice went wrong');
	}

	const json = await response.json();

	if (json.errors) {
		console.error(json.errors);
		throw new Error('GetEstimatedGasPrice failed');
	}

	return transform(json.data);
}

function transform(data?: GetEstimatedGasPriceQuery) {
	if (!data?.estimated_gas_price?.length) return undefined;
	const [gas] = data.estimated_gas_price;
	return {
		base: parseFloat(gas.base_fee),
		avg: parseFloat(gas.mean),
		fast: parseFloat(gas.fast)
	};
}
