import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';


interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  

  constructor(private categoriesRepository: ICategoriesRepository) {}


  execute({name, description}: IRequest): void {
    
    const foundCategory = this.categoriesRepository.findByName(name);

    if(foundCategory) {
      throw new Error('You cannot create a category with the same name');
    }

    this.categoriesRepository.create({description, name})

  }

}

export { CreateCategoryUseCase }