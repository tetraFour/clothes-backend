import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { ITokenData } from '~/types';

export const JWTVerify = (req: Request) => {
  const { userId, login } = <ITokenData>(
    jwt.verify(req.cookies['ut'], process.env.JWT_SECRET)
  );

  return { userId, login };
};
