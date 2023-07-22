import controllerBuilder from '../builders/controller-builder/controller-builder';
import { type AppRequest } from '../builders/controller-builder/controller-builder-types';
import { CardDoc } from '../models/card-model';
import {
	type QueryKind,
	type RequestKind,
	type MutationKind,
	type Resource,
} from '../utils';

// Get cards
const getCardsQueryBuilder = (
	_request: AppRequest<RequestKind.query, Resource.cards, QueryKind.all> // eslint-disable-line @typescript-eslint/no-unused-vars
) => CardDoc.find({});

const getCardsController = controllerBuilder.query({
	queryBuilder: getCardsQueryBuilder,
});

// Create card
const createCardMutationBuilder = async ({
	body,
	user,
}: AppRequest<RequestKind.mutation, Resource.card, MutationKind.create>) =>
	CardDoc.create({ ...body, owner: user._id });

const createCardController = controllerBuilder.mutation({
	mutationBuilder: createCardMutationBuilder,
});

// Like card
const likeCardMutationBuilder = ({
	params: { cardId },
	user,
}: AppRequest<RequestKind.mutation, Resource.card, MutationKind.update>) =>
	CardDoc.findByIdAndUpdate(
		cardId,
		{ $addToSet: { likes: user._id } },
		{ new: true, runValidators: true }
	);

const likeCardController = controllerBuilder.mutation<
	Resource.card,
	MutationKind.update
>({
	mutationBuilder: likeCardMutationBuilder,
});

// Unlike card
const unlikeCardMutationBuilder = ({
	params: { cardId },
	user,
}: AppRequest<RequestKind.mutation, Resource.card, MutationKind.update>) =>
	CardDoc.findByIdAndUpdate(
		cardId,
		{ $pull: { likes: user._id } },
		{ new: true }
	);

const unlikeCardController = controllerBuilder.mutation({
	mutationBuilder: unlikeCardMutationBuilder,
});

// Delete card
const deleteCardMutationBuilder = async ({
	params: { cardId },
}: AppRequest<RequestKind.mutation, Resource.card, MutationKind.delete>) =>
	CardDoc.findByIdAndDelete(cardId);

const deleteCardController = controllerBuilder.mutation({
	mutationBuilder: deleteCardMutationBuilder,
});

export type CardsQueryBuilder = typeof getCardsQueryBuilder;
export type CardsQuery = ReturnType<typeof getCardsQueryBuilder>;

export type CardsMutation<T extends MutationKind> =
	T extends MutationKind.create
		? ReturnType<typeof createCardMutationBuilder>
		: T extends MutationKind.delete
		? ReturnType<typeof deleteCardMutationBuilder>
		: ReturnType<
				typeof likeCardMutationBuilder | typeof unlikeCardMutationBuilder
		  >;

export {
	getCardsController,
	createCardController,
	likeCardController,
	unlikeCardController,
	deleteCardController,
};
