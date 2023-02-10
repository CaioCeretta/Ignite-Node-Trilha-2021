import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO';
import { Specification } from '../model/Specification';


export interface ISpecificationsRepository {

  create({description, name}: ICreateSpecificationDTO): void;
  findByName(name: string): Specification | undefined
  
}

