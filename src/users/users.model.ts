import * as mongoose from 'mongoose';

export const UserModel = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
});

export interface UserModel extends mongoose.Document {
  username: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface User {
  id: string;
  username: string;
}
