import { Schema, model, Document } from 'mongoose';

export interface IFavoriteModel extends Document {
  _id: string;
  userId: string;
  kitId: string;
}

const Favorite = new Schema({
  kitId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Kit',
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const FavoriteModel = model<IFavoriteModel>('Favorite', Favorite);

export default FavoriteModel;
