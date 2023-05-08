import controllerBuilder from '../builders/controller-builder';
import { UserDoc, type UserInput, type UserData } from '../models/user-model';
import { QueryKind } from '../utils';

const getUsersQuery = () => UserDoc.find({});

const getUsersController = controllerBuilder.query({
	query: getUsersQuery,
	queryKind: QueryKind.all,
});

const getUserQuery = (id: string) => UserDoc.findById(id);

const getUserController = controllerBuilder.query({
	query(request) {
		const { params } = request!;
		return getUserQuery(params.userId!);
	},
});

const createUserMutation = async (payload: UserInput) =>
	UserDoc.create(payload);

const createUserController = controllerBuilder.mutation({
	mutation: async ({ body }) => createUserMutation(body),
});

const updateProfileMutation = (
	userId: string,
	payload: { name: UserData['name']; about: UserData['about'] }
) =>
	UserDoc.findByIdAndUpdate(userId, payload, {
		new: true,
		runValidators: true,
	});

const updateProfileController = controllerBuilder.mutation({
	mutation: ({ user, body }) => updateProfileMutation(user._id, body),
});

const updateAvatarMutation = (
	userId: string,
	payload: { avatar: UserData['avatar'] }
) =>
	UserDoc.findByIdAndUpdate(userId, payload, {
		new: true,
		runValidators: true,
	});

const updateAvatarController = controllerBuilder.mutation({
	mutation: ({ user, body }) => updateAvatarMutation(user._id, body),
});

export type UsersQuery = ReturnType<typeof getUserQuery | typeof getUsersQuery>;

export type UsersMutation = ReturnType<
	| typeof createUserMutation
	| typeof updateAvatarMutation
	| typeof updateProfileMutation
	| typeof updateAvatarMutation
>;

export {
	getUsersController,
	getUserController,
	createUserController,
	updateProfileController,
	updateAvatarController,
};
