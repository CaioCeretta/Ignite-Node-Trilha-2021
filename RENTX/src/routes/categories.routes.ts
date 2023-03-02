import { Router } from 'express';
import multer from 'multer';

import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRoutes = Router();

// Se quiser apenas ler o arquivo, pode passar o multer vazio
const upload = multer({
  dest: './tmp',
})

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.post('/import', upload.single("file"), importCategoryController.handle)

export { categoriesRoutes };
