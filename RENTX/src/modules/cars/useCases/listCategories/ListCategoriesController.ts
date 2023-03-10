import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {


  async handle(req: Request, res: Response) {

    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const allCategories = await listCategoriesUseCase.execute();
   
    return res.status(201).json(allCategories);
  }

}

export { ListCategoriesController }