import { Schema, model, Document } from 'mongoose';

export interface IUserModel extends Document {
  _id: string;
  name: string;
  email: string;
  login: string;
  password: string;
  gender: string;
}

const User = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  login: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  gender: {
    type: Schema.Types.String,
    required: true,
  },
});

const UserModel = model<IUserModel>('User', User);

export default UserModel;
