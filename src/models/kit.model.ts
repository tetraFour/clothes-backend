import { Schema, model, Document } from 'mongoose';

export interface IKitModel extends Document {
  _id: string;
  shoes: string;
  underwear: string;
  outerwear: string;
  accessory: string;
  userId: string;
}

const Kit = new Schema({
  shoes: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Clothes',
  },
  underwear: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Clothes',
  },
  outerwear: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Clothes',
  },
  accessory: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Clothes',
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const KitModel = model<IKitModel>('Kit', Kit);

export default KitModel;
