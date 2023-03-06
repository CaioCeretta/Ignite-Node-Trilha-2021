import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers.authorization;


  const [, token] = authHeader.split(" ")

  try {
  const { sub: user_id } = verify(token, "3ec4bedcab551f96573450f68236a641") as IPayload;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(user_id)

  if(!user) {
    throw new AppError('User not found', 401);
  }

  req.user = {
    id: user.id
  }

  next();
  } catch {
    throw new AppError('Invalid token!', 401)
  }



}