import controllerBuilder from '../builders/controller-builder';
import { CardDoc, type CardInput } from '../models/card-model';

const getCardsQuery = () => CardDoc.find({});

const createCardMutation = async (payload: CardInput, userId: string) =>
	CardDoc.create({ ...payload, owner: userId });

const likeCardMutation = (cardId: string, userId: string) =>
	CardDoc.findByIdAndUpdate(
		cardId,
		{ $addToSet: { likes: userId } },
		{ new: true, runValidators: true }
	);

const dislikeCardMutation = (cardId: string, userId: string) =>
	CardDoc.findByIdAndUpdate(
		cardId,
		{ $pull: { likes: userId } },
		{ new: true }
	);

const deleteCardMutation = async (id: string) => CardDoc.findByIdAndDelete(id);

type CardsQuery = ReturnType<typeof getCardsQuery>;

type CardsMutation = ReturnType<
	| typeof deleteCardMutation
	| typeof createCardMutation
	| typeof likeCardMutation
	| typeof dislikeCardMutation
>;

const getCards = controllerBuilder.query({
	query: getCardsQuery,
});

const createCard = controllerBuilder.mutation({
	mutation: async ({ body, user }) => createCardMutation(body, user._id),
});

const likeCard = controllerBuilder.mutation({
	mutation: ({ params, user }) => likeCardMutation(params.cardId!, user._id),
});

const dislikeCard = controllerBuilder.mutation({
	mutation: ({ params, user }) => dislikeCardMutation(params.cardId!, user._id),
});

const deleteCard = controllerBuilder.mutation({
	mutation: async ({ params }) => deleteCardMutation(params.cardId!),
});

export {
	type CardsQuery,
	type CardsMutation,
	getCards,
	createCard,
	likeCard,
	dislikeCard,
	deleteCard,
};
