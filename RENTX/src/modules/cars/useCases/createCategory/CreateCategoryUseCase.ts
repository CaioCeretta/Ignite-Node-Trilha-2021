import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {

  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
    ) {}


  async execute({name, description}: IRequest): Promise<void> {
    
    const foundCategory = await this.categoriesRepository.findByName(name)

    if(foundCategory) {
      throw new Error('You cannot create a category with the same name');
    }

    await this.categoriesRepository.create({description, name})

  }

}

export { CreateCategoryUseCase }