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
    this.router.get(`${this.path}/get-random-clothes`, this.getRandomClothes);
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
  private getRandomClothes = async (req: Request, res: Response) => {
    try {
      const upList = await ClothesModel.find({
        type: 'up',
        gender: String(req.query.gender),
      });
      const downList = await ClothesModel.find({
        type: 'down',
        gender: String(req.query.gender),
      });
      const shoesList = await ClothesModel.find({
        type: 'shoes',
        gender: String(req.query.gender),
      });
      const accessoryList = await ClothesModel.find({
        type: 'accessories',
        gender: String(req.query.gender),
      });

      const up = upList[Math.floor(upList.length * Math.random())];
      const down = downList[Math.floor(downList.length * Math.random())];
      const shoes = shoesList[Math.floor(shoesList.length * Math.random())];
      const accessory =
        accessoryList[Math.floor(accessoryList.length * Math.random())];

      return res.status(200).json({ up, down, shoes, accessory });
    } catch (e) {
      console.log(e);
    }
  };
}

export default ClothesController;
