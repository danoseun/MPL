// // @ts-nocheck

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { messages } from '../utils/message';


dotenv.config()



let connection:string;

if (process.env.NODE_ENV === 'test') {
  connection = process.env.TEST_ATLAS_URI;
}
connection = process.env.DEV_ATLAS_URI;



export const connect = async () => {
  try {
    const db = await mongoose.connect(connection, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log(messages.connectedToDatabase);
    return db;
  } catch (error) {
    console.log(`DBerror ${error}`);
    return console.log(messages.failedToConnect);
  }
};