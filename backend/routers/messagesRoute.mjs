import {Router} from 'express';
import {addMsg, getAllMsg} from '../controlers/messagesController.mjs';

const messagesRoutes = Router();

messagesRoutes.post("/", addMsg);
messagesRoutes.post("/all", getAllMsg);

export {
	messagesRoutes,
};
