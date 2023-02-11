import { Router } from 'express';
import multer from 'multer';

import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

// Se quiser apenas ler o arquivo, pode passar o multer vazio
const upload = multer({
  dest: './tmp',
})

categoriesRoutes.get('/', (req, res) => {
  return listCategoriesController.handle(req, res);
});

categoriesRoutes.post('/', (req, res) => { 
  return createCategoryController.handle(req, res);
});

categoriesRoutes.post('/import', upload.single('file'), (req, res) => {
  return importCategoryController.handle(req, res);

})

export { categoriesRoutes };
