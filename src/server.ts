import './config/environment.config';
import './config/passport.config';
import './config/cloudinary.config';

import express from 'express';
import cors from 'cors';

import App from './app';
import { LoggerMiddleware } from './middleware';
import {
  AuthController,
  UserController,
  ClothesController,
} from './controllers';
import KitController from '~/controllers/kit.controller';

const app = new App({
  port: parseInt(process.env.PORT as string),
  middlewares: [
    express.json(),
    express.urlencoded({ extended: true }),
    LoggerMiddleware,
    cors({
      origin: process.env.DEVELOPMENT,
    }),
  ],
  controllers: [
    new AuthController(),
    new UserController(),
    new ClothesController(),
    new KitController(),
    // new ShareController(),
  ],
});

app.listen();
