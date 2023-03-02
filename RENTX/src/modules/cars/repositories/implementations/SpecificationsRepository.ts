import { getRepository, Repository } from 'typeorm';
import { ICreateSpecificationDTO } from '../../dtos/ICreateSpecificationDTO';
import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../ISpecificationsRepository';

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;
  
  constructor() {
    this.repository = getRepository(Specification);
  }


  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    
    const specification = this.repository.create({
      name,
      description,
      created_at: new Date(),
      updated_at: new Date()
    });

    await this.repository.save(specification);
  }


  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({
      where: {
        name
      }
    });

    return specification
  }




}