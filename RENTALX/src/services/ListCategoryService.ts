import { CategoriesRepository } from '../repositories/CategoriesRepository';

class ListCategoryService {
  constructor(private categoriesRepository: CategoriesRepository){}
  
  execute() {
    const repositories = this.categoriesRepository.list();

    return repositories;
  }

}

export { ListCategoryService }