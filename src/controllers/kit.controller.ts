import * as express from 'express';
import { Request, Response } from 'express';

import { IControllerBase } from '../interfaces';
import { UserModel, ClothesModel, KitModel, FavoriteModel } from '../models';
import cloudinary from 'cloudinary';
import { IKitModel } from '~/models/kit.model';

class KitController implements IControllerBase {
  public path = '/api/kit';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes = (): void => {
    this.router.get(`${this.path}/get-kits`, this.getKits);
    this.router.post(`${this.path}/create-kit`, this.createKits);
    this.router.get(`${this.path}/get-favorites`, this.getFavorites);
    this.router.post(`${this.path}/add-to-favorite`, this.addToFavorite);
  };

  private getKits = async (req: Request, res: Response) => {
    try {
      const { user } = req.query;
      const kits = await KitModel.find({ userId: user as string }).populate([
        'underwear',
        'outerwear',
        'shoes',
        'accessory',
      ]);
      return res.status(200).send(kits);
    } catch (e) {}
  };

  private createKits = async (req: Request, res: Response) => {
    try {
      const { userId, underwear, outerwear, shoes, accessory } = <IKitModel>(
        req.body
      );

      const kit = new KitModel({
        userId,
        underwear,
        outerwear,
        shoes,
        accessory,
      });
      await kit.save();
      return res.status(200).send('kit has been created');
    } catch (e) {}
  };
  private addToFavorite = async (req: Request, res: Response) => {
    try {
      const { userId, kitId } = req.body;

      const favorite = new FavoriteModel({ userId, kitId });

      await favorite.save();

      return res.status(200).send('success added to favorite');
    } catch (e) {}
  };

  private getFavorites = async (req: Request, res: Response) => {
    try {
      const { user } = req.query;
      const favorites = await FavoriteModel.findOne({
        userId: user as string,
      }).populate(['kitId', 'userId']);

      // console.log((<any>favorites.kitId)._id);

      const finalFav = await KitModel.findOne({
        id: (<any>favorites.kitId)._id,
      });

      console.log(finalFav);

      return res.status(200).send(finalFav);
    } catch (e) {}
  };
}

export default KitController;
