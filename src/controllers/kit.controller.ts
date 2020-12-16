import * as express from 'express';
import { Request, Response } from 'express';

import { IControllerBase } from '../interfaces';
import { UserModel, ClothesModel, KitModel } from '../models';
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
}

export default KitController;
