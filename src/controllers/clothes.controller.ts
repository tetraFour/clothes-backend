import * as express from 'express';
import { Request, Response } from 'express';

import { IControllerBase } from '../interfaces';
import { UserModel, ClothesModel } from '../models';
import { IClothesModel } from '../models/clothes.model';
import cloudinary from 'cloudinary';

class ClothesController implements IControllerBase {
  public path = '/api/clothes';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes = (): void => {
    this.router.get(`${this.path}/get-clothes`, this.getClothes);
    this.router.post(`${this.path}/create-clothes`, this.createClothes);
    this.router.get(`${this.path}/get-current-clothes`, this.getCurrentClothes);
  };

  private createClothes = async (req: Request, res: Response) => {
    try {
      const { name, url, type, gender } = <IClothesModel>req.body;
      const clothes = new ClothesModel({ name, url, type, gender });
      await clothes.save();
      return res.status(200).send(`${name}/${type}/${gender} has been sent`);
    } catch (e) {
      console.log(e);
    }
  };

  private getCurrentClothes = async (req: Request, res: Response) => {
    try {
      const clothes = await ClothesModel.find({
        gender: String(req.query.gender),
        type: String(req.query.type),
      });
      return res.status(200).json(clothes);
    } catch (e) {}
  };

  private getClothes = async (req: Request, res: Response) => {
    try {
      const clothes = await ClothesModel.find({
        gender: String(req.query.gender),
      });
      return res.status(200).json(clothes);
    } catch (e) {
      console.log(e);
    }
  };
}

export default ClothesController;
