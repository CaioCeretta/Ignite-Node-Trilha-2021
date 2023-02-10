import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase
 {

  constructor(private specificationsRepository: ISpecificationsRepository){}

  execute({description, name}: IRequest): void {
    

    const specificationAlreadyExists = this.specificationsRepository.findByName(name);

    if(specificationAlreadyExists) {
      throw new Error('This name is already been used')
    }

    this.specificationsRepository.create({
      name,
      description,
    })
  }

} 

export { CreateSpecificationUseCase};