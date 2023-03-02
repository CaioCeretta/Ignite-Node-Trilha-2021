import { CategoriesRepository } from '../../src/modules/cars/repositories/implementations/CategoriesRepository';

class ListCategoryService {
  constructor(private categoriesRepository: CategoriesRepository){}
  
  execute() {
    const repositories = this.categoriesRepository.list();

    return repositories;
  }

}

export { ListCategoryService }