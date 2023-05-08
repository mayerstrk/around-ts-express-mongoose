import controllerBuilder from '../builders/controller-builder';
import { CardDoc, type CardInput } from '../models/card-model';
import { QueryKind } from '../utils';

const getCardsQuery = () => CardDoc.find({});

const getCardsController = controllerBuilder.query({
	query: getCardsQuery,
	queryKind: QueryKind.all,
});

const createCardMutation = async (payload: CardInput, userId: string) =>
	CardDoc.create({ ...payload, owner: userId });

const createCardController = controllerBuilder.mutation({
	mutation: async ({ body, user }) => createCardMutation(body, user._id),
});

const likeCardMutation = (cardId: string, userId: string) =>
	CardDoc.findByIdAndUpdate(
		cardId,
		{ $addToSet: { likes: userId } },
		{ new: true, runValidators: true }
	);

const likeCardController = controllerBuilder.mutation({
	mutation: ({ params, user }) => likeCardMutation(params.cardId!, user._id),
});

const dislikeCardMutation = (cardId: string, userId: string) =>
	CardDoc.findByIdAndUpdate(
		cardId,
		{ $pull: { likes: userId } },
		{ new: true }
	);

const dislikeCardController = controllerBuilder.mutation({
	mutation: ({ params, user }) => dislikeCardMutation(params.cardId!, user._id),
});

const deleteCardMutation = async (id: string) => CardDoc.findByIdAndDelete(id);

const deleteCardController = controllerBuilder.mutation({
	mutation: async ({ params }) => deleteCardMutation(params.cardId!),
});

export type CardsQuery = ReturnType<typeof getCardsQuery>;

export type CardsMutation = ReturnType<
	| typeof deleteCardMutation
	| typeof createCardMutation
	| typeof likeCardMutation
	| typeof dislikeCardMutation
>;

export {
	getCardsController,
	createCardController,
	likeCardController,
	dislikeCardController,
	deleteCardController,
};
