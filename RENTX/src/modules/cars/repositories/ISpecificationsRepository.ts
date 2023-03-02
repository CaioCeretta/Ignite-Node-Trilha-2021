import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO';
import { Specification } from '../entities/Specification';


export interface ISpecificationsRepository {

  create({description, name}: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>
  
}

