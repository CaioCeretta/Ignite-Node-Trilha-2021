import { ICreateCategoryDTO } from '../src/modules/cars/dtos/ICreateCategoryDTO';
import { Category } from '../src/modules/cars/entities/Category';
import { ICategoriesRepository } from '../src/modules/cars/repositories/ICategoriesRepository'


class PostgresCategoriesRepository {
// class PostgresCategoriesRepository  implements ICategoriesRepository {
  findByName(name: string): Category | undefined {
    return undefined;
  }
  list(): Category[] | undefined {
    return undefined;
    // return Category;
  }
  create({name, description}: ICreateCategoryDTO): void {
    console.log(name, description);
  }


}

export { PostgresCategoriesRepository }