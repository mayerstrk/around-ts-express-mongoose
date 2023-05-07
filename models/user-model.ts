import { Schema, model, type Document } from 'mongoose';

interface UserInput {
	name: string;
	about: string;
	avatar: string;
}

interface UserData extends Document, UserInput {
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new Schema<UserInput>({
	name: { type: String, required: true },
	about: { type: String, required: true },
	avatar: { type: String, required: true },
});

userSchema.set('timestamps', true);

const UserDoc = model<UserData>('User', userSchema);

export { type UserInput, type UserData, UserDoc };
