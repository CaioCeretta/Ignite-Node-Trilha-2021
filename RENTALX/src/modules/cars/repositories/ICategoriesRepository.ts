import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO'; 
import { Category } from '../model/Category';

export interface ICategoriesRepository {
  findByName(name: string): Category | undefined;
  list(): Category[];
  create({name, description}: ICreateCategoryDTO): void;
}
