import './config/environment.config';
import './config/passport.config';
import './config/cloudinary.config';

import express from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import App from './app';
import { LoggerMiddleware } from './middleware';
import {
  AuthController,
  UserController,
  ClothesController,
} from './controllers';

const app = new App({
  port: parseInt(process.env.PORT as string),
  middlewares: [
    express.json(),
    express.urlencoded({ extended: true }),
    LoggerMiddleware,
    passport.initialize(),
    cookieParser(),
    cors({
      origin: process.env.DEVELOPMENT,
    }),
  ],
  controllers: [
    new AuthController(),
    new UserController(),
    new ClothesController(),
  ],
});

app.listen();
