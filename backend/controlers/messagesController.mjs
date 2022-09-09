import {MessageModel} from '../models/messageModel.mjs';

const addMsg = async (request, response, next) => {
	try {
		const {from, to, message} = request.body;
		const data = await MessageModel.create({
			message: {text: message},
			users: [from, to],
			sender: from,
		});
		if (data) {
			return response.json({msg: 'Message added successfully'});
		} else {
			return response.json({msg: 'Failed to add message'});
		}

	} catch (error) {
		next(error);
	}
}

const getAllMsg = async (request, response, next) => {
	try {
		const {from, to} = request.body;
		const messages = await MessageModel.find({
			users: {
				$all: [from, to]
			}
		})
			.sort({updatedAt: 1});

		const projectMessages = messages.map((msg) => {
			return {
				fromSelf: msg.sender.toString() === from,
				message: msg.message.text
			};
		})
		response.json(projectMessages);

	} catch (error) {
		next(error);
	}
}

export {
	addMsg,
	getAllMsg
};
