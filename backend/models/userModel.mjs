import mongoose from 'mongoose';
import process from 'node:process';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

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

userSchema.methods.generateAuthToken = function () {
	return jwt.sign({
		_id: this._id,
		username: this.username,
	}, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '15m',
	});
};


const UserModel = mongoose.model('User', userSchema);

export {
	UserModel,
};
