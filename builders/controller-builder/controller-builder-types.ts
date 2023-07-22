import { type Request } from 'express';
import {
	type CardsMutation,
	type CardsQuery,
} from '../../controllers/cards-controller';
import {
	type UsersMutation,
	type UsersQuery,
} from '../../controllers/users-controllers';
import {
	type Resource,
	type MutationKind,
	type QueryKind,
	type RequestKind,
} from '../../utils';

type AppQuery = UsersQuery | CardsQuery;

type AppQueryBuilder<R extends QueryableResources, K extends QueryKind> = (
	request: AppRequest<RequestKind.query, R, K>
) => AppQuery;

type AppMutation<T extends MutationKind> = T extends MutationKind.create
	? CardsMutation<MutationKind.create> | UsersMutation<MutationKind.create>
	: T extends MutationKind.update
	? CardsMutation<MutationKind.update> | UsersMutation<MutationKind.update>
	: CardsMutation<MutationKind.delete>;

type AppMutationBuilder<R extends MutableResources, K extends MutationKind> = (
	request: AppRequest<RequestKind.mutation, R, K>
) => AppMutation<K>;

type QueryableResources = Resource.user | Resource.users | Resource.cards;

type MutableResources = Resource.user | Resource.card;

interface AppRequest<
	T extends RequestKind,
	R extends QueryableResources | MutableResources,
	K extends QueryKind | MutationKind
> extends Request {
	params: // Params' shape for queries and mutations
	// Queries
	T extends RequestKind.query
		? // User queries
		  R extends Resource.user
			? K extends QueryKind.filter
				? { userId: string }
				: Record<symbol, never>
			: // Other queries
			  Record<symbol, never>
		: T extends RequestKind.mutation
		? R extends Resource.card
			? K extends MutationKind.update | MutationKind.delete
				? { cardId: string }
				: Record<symbol, never>
			: Record<symbol, never>
		: Record<symbol, never>;

	user: {
		_id: string;
	};
}

type QueryBuilderOptions<R extends QueryableResources, K extends QueryKind> = {
	queryBuilder: AppQueryBuilder<R, K>;
} & (K extends QueryKind.filter ? { queryKind: K } : { queryKind?: never });

type MutationBuilderOptions<
	R extends MutableResources,
	K extends MutationKind
> = {
	mutationBuilder: AppMutationBuilder<R, K>;
} & (K extends never ? Record<symbol, never> : Record<symbol, never>);

export type {
	AppQuery,
	AppQueryBuilder,
	AppMutation,
	AppMutationBuilder,
	QueryableResources,
	MutableResources,
	AppRequest,
	QueryBuilderOptions,
	MutationBuilderOptions,
};
