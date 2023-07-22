import controllerBuilder from '../builders/controller-builder/controller-builder';
import { type AppRequest } from '../builders/controller-builder/controller-builder-types';
import { UserDoc } from '../models/user-model';
import {
	type MutationKind,
	QueryKind,
	type Resource,
	type RequestKind,
} from '../utils';

// Get users
const getUsersQueryBuilder = (
	_request: AppRequest<RequestKind.query, Resource.user, QueryKind.all> // eslint-disable-line @typescript-eslint/no-unused-vars
) => UserDoc.find({});

const getUsersController = controllerBuilder.query({
	queryBuilder: getUsersQueryBuilder,
});

// Get user
const getUserQueryBuilder = ({
	params: { userId },
}: AppRequest<RequestKind.query, Resource.user, QueryKind.filter>) =>
	UserDoc.findById(userId);

const getUserController = controllerBuilder.query({
	queryBuilder: getUserQueryBuilder,
	queryKind: QueryKind.filter,
});

// Create user
const createUserMutationBuilder = async ({
	body,
}: AppRequest<RequestKind.mutation, Resource.user, MutationKind.create>) =>
	UserDoc.create(body);

const createUserController = controllerBuilder.mutation({
	mutationBuilder: createUserMutationBuilder,
});

// Update profile
const updateProfileMutationBuilder = ({
	user,
	body,
}: AppRequest<RequestKind.mutation, Resource.user, MutationKind.update>) =>
	UserDoc.findByIdAndUpdate(user._id, body, {
		new: true,
		runValidators: true,
	});

const updateProfileController = controllerBuilder.mutation({
	mutationBuilder: updateProfileMutationBuilder,
});

// Update avatar
const updateAvatarMutationBuilder = ({
	user,
	body,
}: AppRequest<RequestKind.mutation, Resource.user, MutationKind.update>) =>
	UserDoc.findByIdAndUpdate(user._id, body, {
		new: true,
		runValidators: true,
	});

const updateAvatarController = controllerBuilder.mutation({
	mutationBuilder: updateAvatarMutationBuilder,
});

export type UsersQuery = ReturnType<
	typeof getUsersQueryBuilder | typeof getUserQueryBuilder
>;

export type UsersMutation<T extends MutationKind.create | MutationKind.update> =
	T extends MutationKind.create
		? ReturnType<typeof createUserMutationBuilder>
		: ReturnType<
				typeof updateAvatarMutationBuilder | typeof updateProfileMutationBuilder
		  >;

export {
	getUsersController,
	getUserController,
	createUserController,
	updateProfileController,
	updateAvatarController,
};
