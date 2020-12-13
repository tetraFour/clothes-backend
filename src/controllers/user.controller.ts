import * as express from 'express';
import { Request, Response } from 'express';

import { UserModel, ClothesModel, KitModel, ShareModel } from '~/models';
import { IControllerBase } from '~/interfaces';
import { JWTVerify } from '~/utils/jwtVerify.utils';

class UserController implements IControllerBase {
  public path = '/api/user';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes = (): void => {};
}

export default UserController;
