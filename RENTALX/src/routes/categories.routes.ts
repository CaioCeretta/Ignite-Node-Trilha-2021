import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { Category } from '../model/Category';
import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';
import { ListCategoryService } from '../services/ListCategoryService';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();


categoriesRoutes.get('/', (req, res) => {
  const listCategoryService = new ListCategoryService(categoriesRepository);

  const allCategories = listCategoryService.execute();

  return res.status(201).json(allCategories);
});

categoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({name, description})


  return res.status(201).send();
});

export { categoriesRoutes };
