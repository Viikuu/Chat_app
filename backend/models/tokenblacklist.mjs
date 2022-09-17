import mongoose from 'mongoose';

const BlackListSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
	},
);

const BlackList = mongoose.model('BlackList', BlackListSchema);

export {
	BlackList,
};
