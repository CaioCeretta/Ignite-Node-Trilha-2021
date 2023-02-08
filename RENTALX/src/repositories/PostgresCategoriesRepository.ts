import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import { Category } from '../model/Category'
import { ICategoriesRepository } from './ICategoriesRepository'



class PostgresCategoriesRepository  implements ICategoriesRepository {
  findByName(name: string): Category | undefined {
    return undefined;
  }
  list(): Category[] {
    return null;
  }
  create({name, description}: ICreateCategoryDTO): void {
    console.log(name, description);
  }


}

export { PostgresCategoriesRepository }