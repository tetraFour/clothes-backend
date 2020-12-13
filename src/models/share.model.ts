import { Schema, model, Document } from 'mongoose';

export interface IShareModel extends Document {
  _id: string;
  fromUser: string;
  toUser: string;
}

const Share = new Schema({
  kitClothes: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Clothes',
  },
  fromUser: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  toUser: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const ShareModel = model<IShareModel>('Share', Share);

export default ShareModel;
