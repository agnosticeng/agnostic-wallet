import type { ParamMatcher } from '@sveltejs/kit';
import { isValidAddress } from '$lib/utils/address';

export const match = ((param) => isValidAddress(param)) satisfies ParamMatcher;
