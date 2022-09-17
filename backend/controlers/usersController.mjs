import {UserModel} from '../models/userModel.mjs';
import bcrypt from 'bcrypt';
import process from 'node:process';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {BlackList} from '../models/tokenblacklist.mjs';

dotenv.config();

const register = async (request, response, next) => {
	try {
		const {username, email, password} = request.body;
		const usernameCheck = await UserModel.findOne({username});
		if (usernameCheck) {
			return response.json({message: "Username already used", status: false});
		}
		const emailCheck = await UserModel.findOne({email});
		if (emailCheck) {
			return response.json({message: "Email already used", status: false});
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await UserModel.create({
			email,
			username,
			password: hashedPassword,
		})
		delete user.password;

		response.cookie('refreshToken', await user.generateAuthToken(), {
			httpOnly: true,
		});

		return response.json({status: true});
	} catch (error) {
		next(error);
	}
}

const login = async (request, response, next) => {
	try {
		const {username, password} = request.body;
		const user = await UserModel.findOne({username});
		if (!user) {
			return response.json({message: "Incorrect username or password", status: false});
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if(!isPasswordValid) {
			return response.json({message: "Incorrect username or password", status: false});
		}
		delete user.password;

		response.cookie('refreshToken', await user.generateAuthToken(), {
			httpOnly: true,
		});
		return response.json({status: true});
	} catch (error) {
		next(error);
	}
}

const setavatar = async (request, response, next) => {
	try {
		const userId = request.params.id;
		const avatarColor = request.body.avatarColor;
		const userData = await UserModel.findByIdAndUpdate(userId, {
			isAvatarColorSet:true,
			avatarColor,
		});
		return response.json({
			isSet: userData.isAvatarColorSet,
			avatarColor: userData.avatarColor,
		});
	} catch (error) {
		next(error);
	}
}

const allusers = async (request, response, next) => {
	try {
		const users = await UserModel.find({_id:{$ne:request.params.id}}).select([
			"username",
			"avatarColor",
			"_id",
		]);
		return response.json({users})
	} catch (error) {
		next(error);
	}
}

const logout = async (request, response, next) => {
	try {
		const token = request.cookie("token");
		response.clearCookie('token');
		let id;
		try{
			id = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		} catch (error) {
			return response.json({status:true, message:'Logged out successfully'});
		}
		if(id !== undefined) {
			await BlackList.create({
				token,
			});
			return response.json({status:true, message:'Logged out successfully'});
		}
	} catch (error) {
		next(error);
	}
}

const user = async (request, response, next) => {
	try {
		const user = await UserModel.findOne({_id:request.params.id}).select([
			"username",
			"avatarColor",
			"_id",
		]);
		return response.json({user})
	} catch (error) {
		next(error);
	}
}

export {
	register,
	login,
	setavatar,
	allusers,
	user,
	logout,
};
