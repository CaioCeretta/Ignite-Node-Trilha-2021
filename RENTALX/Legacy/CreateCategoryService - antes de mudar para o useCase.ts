import { CategoriesRepository } from '../RENTALX/src/modules/cars/repositories/implementations/CategoriesRepository';
import { ICategoriesRepository } from '../RENTALX/src/modules/cars/repositories/ICategoriesRepository';


interface IRequest {
  name: string;
  description: string;
}

/**
 * [] - Definir o tipo do retorno
 * [X] - Alterar o tipo do erro
 * [] - Acessar o repositório < É importante que o service conheça o repositório
 * [] - Retornar algo
 */
class CreateCategoryService {
  

  constructor(private categoriesRepository: ICategoriesRepository) {}


  execute({name, description}: IRequest): void {
    
    const foundCategory = this.categoriesRepository.findByName(name);

    if(foundCategory) {
      throw new Error('You cannot create a category with the same name');
    }

    this.categoriesRepository.create({description, name})

  }

}

export { CreateCategoryService }