import controllerBuilder from '../builders/controller-builder';
import { CardDoc, type CardInput } from '../models/card-model';

const getCardsQuery = () => CardDoc.find({});

const createCardMutation = async (payload: CardInput) =>
	CardDoc.create(payload);

const likeCardMutation = (id: string, payload: { likes: string }) =>
	CardDoc.findByIdAndUpdate(id, { $addToSet: payload }, { new: true });

const dislikeCardMutation = (id: string, payload: { likes: string }) =>
	CardDoc.findByIdAndUpdate(id, { $pull: payload }, { new: true });

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
	mutation: async ({ body }) => createCardMutation(body),
});

const likeCard = controllerBuilder.mutation({
	mutation: ({ params, body }) => likeCardMutation(params.id, body),
});

const dislikeCard = controllerBuilder.mutation({
	mutation: ({ params, body }) => dislikeCardMutation(params.id, body),
});

const deleteCard = controllerBuilder.mutation({
	mutation: async ({ params }) => deleteCardMutation(params.id),
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
