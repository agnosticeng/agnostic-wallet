import { AGNOSTIC_API_KEY, AGNOSTIC_PROXY_ENDPOINT } from '$env/static/private';

const QUERY = `
select
  timestamp,
  arrayAvg (transaction_effective_gas_price) / 1e9 as gas_avg
from evm_blocks_ethereum_mainnet_v1
where timestamp > now() - interval 1 minute
order by timestamp desc
limit 1`;

type ProxyResponse = {
	column_descriptors: { name: string; type: string }[];
	rows?: string[][] | null;
};

export async function request() {
	const headers = new Headers();
	headers.set('Authorization', AGNOSTIC_API_KEY);
	headers.set('Cache-control', 'no-cache');

	const response = await fetch(AGNOSTIC_PROXY_ENDPOINT, {
		body: QUERY,
		headers,
		method: 'POST'
	});

	if (!response.ok) throw new Error('Invalid gas request');

	const json = (await response.json()) as ProxyResponse;
	const avg = json.rows?.at(0)?.at(json.column_descriptors.findIndex((c) => c.name === 'gas_avg'));
	if (avg) return { avg: Math.round(parseFloat(avg)) };

	throw new Error('Invalid response');
}
