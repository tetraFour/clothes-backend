import * as express from 'express';
import { Request, Response } from 'express';

import { UserModel, ClothesModel, KitModel, ShareModel } from '../models';
import { IControllerBase } from '../interfaces';
import { JWTVerify } from '../utils/jwtVerify.utils';
import { IClothesModel } from '~/models/clothes.model';

class UserController implements IControllerBase {
  public path = '/api/user';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes = (): void => {
    this.router.get(`${this.path}/get-users`, this.getUsers);
  };

  private getUsers = async (req: Request, res: Response) => {
    try {
      const users = await UserModel.find();
      console.log(users);
      // @ts-ignore
      const finalUsers = users.filter(user => user.id !== String(req.query.id));
      return res.status(200).send(finalUsers);
    } catch (e) {
      console.log(e);
    }
  };
}

export default UserController;
