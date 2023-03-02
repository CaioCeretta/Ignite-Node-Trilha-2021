import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {

  async handle(req: Request, res: Response): Promise<Response> {
   
    const {name, email, username, password, drivers_license} = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({name, email, username, password, drivers_license});

    return res.status(201).send();

  }


}