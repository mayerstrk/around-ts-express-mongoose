import { type Request, type Response } from 'express';
import {
	Status,
	ErrorName,
	QueryKind,
	type MutationKind,
	type RequestKind,
} from '../../utils';

import {
	type QueryableResources,
	type MutableResources,
	type AppRequest,
	type QueryBuilderOptions,
	type MutationBuilderOptions,
} from './controller-builder-types';

const handleError = (error: Error, response: Response) => {
	const errorName = error.name;

	switch (errorName) {
		case ErrorName.validation: {
			response.status(Status.badRequest);
			break;
		}

		case ErrorName.notFound: {
			response.status(Status.notFound);
			break;
		}

		case ErrorName.cast: {
			response.status(Status.badRequest);
			break;
		}

		default: {
			response.status(Status.internalServerError);
			break;
		}
	}

	response.send({
		message: error.message ?? 'Unexpected error',
		error: error.name,
	});
};

const controllerBuilder = {
	query<R extends QueryableResources, K extends QueryKind>({
		queryBuilder,
		queryKind,
	}: QueryBuilderOptions<R, K>) {
		return (request: Request, response: Response) => {
			const query = queryBuilder(
				request as AppRequest<RequestKind.query, R, K>
			);

			let promiseChain = query;

			if (queryKind === QueryKind.filter) {
				promiseChain = promiseChain.orFail();
			}

			promiseChain
				.then((data) => {
					response.status(Status.ok).send({ data });
				})
				.catch((error) => {
					handleError(error, response);
				});
		};
	},
	mutation<R extends MutableResources, K extends MutationKind>({
		mutationBuilder,
	}: MutationBuilderOptions<R, K>) {
		return (request: Request, response: Response) => {
			const mutation = mutationBuilder(
				request as AppRequest<RequestKind.mutation, R, K>
			);
			mutation
				.then((data) => {
					if (!data) {
						const error = new Error(
							`No document with id: '${
								request.params.cardId ?? request.params.userId
							}' was found in model`
						);
						error.name = ErrorName.notFound;

						throw error;
					}

					response.status(Status.ok);
					response.send({ data });
				})
				.catch((error) => {
					handleError(error, response);
				});
		};
	},
};

export default controllerBuilder;
