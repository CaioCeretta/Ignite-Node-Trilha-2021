import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO';
import { Category } from '../../model/Category';
import { ICategoriesRepository } from '../ICategoriesRepository'


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