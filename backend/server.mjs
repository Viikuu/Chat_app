import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {Server} from 'socket.io';
import cookieParser from 'cookie-parser';
import {connection} from './utils/db.mjs';
import {userRoutes} from './routers/userRoutes.mjs';
import {messagesRoutes} from './routers/messagesRoute.mjs';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);

await connection();

const server = app.listen(process.env.PORT, () => {
	console.log('Listening on http://localhost:5000');
});

const io = new Server(server, {
	cors:{
		origin:"http://localhost:3000",
		credentials: true,
	},
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
	global.chatSocket = socket;
	socket.on("add-user", (userId) => {
		onlineUsers.set(userId, socket.id);
	});
	socket.on("send-msg", (data) => {
		const sendUserSocket = onlineUsers.get(data.to);
		if(sendUserSocket) {
			socket.to(sendUserSocket).emit("msg-receive", data.msg);
		}
	});
});


