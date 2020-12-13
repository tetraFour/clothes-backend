import { Schema, model, Document } from 'mongoose';

export interface IClothesModel extends Document {
  _id: string;
  name: string;
  url: string;
  type: string;
  gender: string;
}

const Clothes = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  url: {
    type: Schema.Types.String,
    required: true,
  },
  type: {
    type: Schema.Types.String,
    required: true,
  },
  gender: {
    type: Schema.Types.String,
    required: true,
  },
});

const ClothesModel = model<IClothesModel>('Clothes', Clothes);

export default ClothesModel;
