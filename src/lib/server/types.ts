export interface GraphQLParams<
	TVariables = Record<string, unknown>,
	TExtensions = Record<string, unknown>
> {
	operationName?: string;
	query?: string;
	variables?: TVariables;
	extensions?: TExtensions;
}
