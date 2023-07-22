import { Schema, model, type Document } from 'mongoose';
import { mongooseLinkValidator } from '../utils';

interface UserInput {
	name: string;
	about: string;
	avatar: string;
}

interface UserData extends Document, UserInput {
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new Schema<UserData>(
	{
		name: {
			type: String,
			minlength: 2,
			maxlength: 30,
			required: true,
		},
		about: {
			type: String,
			minlength: 2,
			maxlength: 30,
			required: true,
		},
		avatar: {
			type: String,
			required: true,
			validate: {
				validator: mongooseLinkValidator,
			},
		},
	},
	{ timestamps: true }
);

const UserDoc = model<typeof userSchema>('User', userSchema);

export { type UserInput, type UserData, UserDoc };
