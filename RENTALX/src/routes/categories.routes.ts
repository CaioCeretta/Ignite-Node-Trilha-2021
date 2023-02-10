import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { Category } from '../modules/cars/model/Category';

import { CategoriesRepository } from '../modules/cars/repositories/implementations/CategoriesRepository';
import { ListCategoryService } from '../modules/cars/services/ListCategoryService';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { CreateCategoryUseCase } from '../modules/cars/useCases/createCategory/CreateCategoryUseCase';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();
const categoriesRepository = CategoriesRepository.getInstance();


categoriesRoutes.get('/', (req, res) => {
  return listCategoriesController.handle(req, res);
});

categoriesRoutes.post('/', (req, res) => { 
  return createCategoryController.handle(req, res);
});

export { categoriesRoutes };
