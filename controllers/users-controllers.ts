import controllerBuilder from '../builders/controller-builder';
import { UserDoc, type UserInput, type UserData } from '../models/user-model';

const getUsersQuery = () => UserDoc.find({});
const getUserQuery = (id: string) => UserDoc.findById(id);

const createUserMutation = async (payload: UserInput) =>
	UserDoc.create(payload);

const updateProfileMutation = (
	userId: string,
	payload: { name: UserData['name']; about: UserData['about'] }
) =>
	UserDoc.findByIdAndUpdate(userId, payload, {
		new: true,
		runValidators: true,
	});

const updateAvatarMutation = (
	userId: string,
	payload: { avatar: UserData['avatar'] }
) =>
	UserDoc.findByIdAndUpdate(userId, payload, {
		new: true,
		runValidators: true,
	});

type UsersQuery = ReturnType<typeof getUserQuery | typeof getUsersQuery>;

type UsersMutation = ReturnType<
	| typeof createUserMutation
	| typeof updateAvatarMutation
	| typeof updateProfileMutation
	| typeof updateAvatarMutation
>;

const getUsers = controllerBuilder.query({
	query: getUsersQuery,
});

const getUser = controllerBuilder.query({
	query(request) {
		const { params } = request!;
		return getUserQuery(params.userId!);
	},
});

const createUser = controllerBuilder.mutation({
	mutation: async ({ body }) => createUserMutation(body),
});

const updateProfile = controllerBuilder.mutation({
	mutation: ({ user, body }) => updateProfileMutation(user._id, body),
});

const updateAvatar = controllerBuilder.mutation({
	mutation: ({ user, body }) => updateAvatarMutation(user._id, body),
});

export {
	type UsersQuery,
	type UsersMutation,
	getUsers,
	getUser,
	createUser,
	updateProfile,
	updateAvatar,
};
