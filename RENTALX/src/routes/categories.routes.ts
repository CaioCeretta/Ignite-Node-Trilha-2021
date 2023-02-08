import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { Category } from '../model/Category';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get('/', (req, res) => {
  const allCategories = categoriesRepository.list();

  return res.status(201).json(allCategories);
});

categoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body;


  const foundCategory = categoriesRepository.findByName(name);

  if(foundCategory) {
    return res.status(404).json({error: 'You cannot create a category with the same name'});
  }

  categoriesRepository.create({description, name})


  return res.status(201).send();
});

export { categoriesRoutes };
