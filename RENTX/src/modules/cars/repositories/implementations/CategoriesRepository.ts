import { getRepository, Repository } from 'typeorm';
import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO'; 
import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';



export class CategoriesRepository implements ICategoriesRepository {
  // private categories: Category[];
  private repository: Repository<Category>;

  // private static INSTANCE: CategoriesRepository;

  constructor() {
    this.repository = getRepository(Category);
  }

  // public static getInstance(): CategoriesRepository {
  //   if(!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }

  //   return CategoriesRepository.INSTANCE; 
  // }

  async create({name, description}: ICreateCategoryDTO): Promise<void> {

    const category = this.repository.create({
      description,
      name
    })

    await this.repository.save(category);

  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    

    return categories;
  }

  async findByName(name: string): Promise<Category> {

    const category = await this.repository.findOne({where: {
      name
    }});

    return category;
  }
}

