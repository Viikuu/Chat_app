import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			min: 3,
			max: 20,
			unique: true
		},
		email: {
			type: String,
			required: true,
			max:50,
			unique: true
		},
		password: {
			type: String,
			required: true,
			min:8,
		},
		isAvatarColorSet: {
			type: Boolean,
			default: false,
		},
		avatarColor: {
			type: Object,
			default: '',
		},
	},
	{timestamps: true}
);

const UserModel = mongoose.model('User', userSchema);

export {
	UserModel,
};
