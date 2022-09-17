import {Router} from 'express';
import {register, login, setavatar, allusers, user, logout} from '../controlers/usersController.mjs';

const userRoutes = Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/setavatar/:id", setavatar);
userRoutes.get("/allusers/:id", allusers);
userRoutes.get("/user/:id", user);
userRoutes.post("/logout", logout);

export {
	userRoutes,
};
