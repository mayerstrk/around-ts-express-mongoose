import controllerBuilder from '../builders/controller-builder';
import { CardDoc, type CardInput } from '../models/card-model';

const getCardsQuery = () => CardDoc.find({});

const createCardMutation = async (payload: CardInput, user: { _id: string }) =>
	CardDoc.create({ ...payload, owner: user._id });

const likeCardMutation = (id: string, user: { _id: string }) =>
	CardDoc.findByIdAndUpdate(
		id,
		{ $addToSet: { likes: user._id } },
		{ new: true }
	);

const dislikeCardMutation = (id: string, user: { _id: string }) =>
	CardDoc.findByIdAndUpdate(id, { $pull: { likes: user._id } }, { new: true });

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
	mutation: async ({ body, user }) => createCardMutation(body, user),
});

const likeCard = controllerBuilder.mutation({
	mutation: ({ params, user }) => likeCardMutation(params.id, user),
});

const dislikeCard = controllerBuilder.mutation({
	mutation: ({ params, user }) => dislikeCardMutation(params.id, user),
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
