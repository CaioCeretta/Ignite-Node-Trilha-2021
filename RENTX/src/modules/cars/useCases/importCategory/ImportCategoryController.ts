import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {


  async handle(req: Request, res: Response): Promise<Response> {
    const {file} = req;

    console.log(req.file)

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase)

    if(file) {
      await importCategoryUseCase.execute(file);
    }

    return res.send();

  }

}

export {ImportCategoryController}