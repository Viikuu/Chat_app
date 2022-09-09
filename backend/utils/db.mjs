import process from 'node:process';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

async function connection() {
	try {
		dotenv.config();
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to db');
	} catch (error) {
		console.log(error.message);
		console.log('Couldn\'t connect to db');
	}
}

export {
	connection,
};
