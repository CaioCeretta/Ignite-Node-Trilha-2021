import fs from 'fs';
import csvParse from 'csv-parse';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategoryCSV {
  name: string;
  description: string;
}

class ImportCategoryUseCase {

  constructor(private categoriesRepoitory: ICategoriesRepository) { }


  async loadCategoriesCSV(file: Express.Multer.File): Promise<IImportCategoryCSV[]> {

    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategoryCSV[] = [];

      //Responsável por ler linha por linha
      const parseFile = csvParse();

      //Foi possível ler o arquivo porque a cada pedaço lido, estamos passando para o pipe
      stream.pipe(parseFile);

      parseFile.on('data', async line => {
        const [name, description] = line;
        categories.push({
          name, description
        });
      })
      .on("end", () => {
        resolve(categories)
      })
      .on("error", err => {
        reject(err);
      });
    })


  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategoriesCSV(file);

    categories.map(async category => {
      const { name, description } = category;

      const foundCategory = this.categoriesRepoitory.findByName(name);

      if(!foundCategory) {
        this.categoriesRepoitory.create({
          name,
          description
        })
      }
    })

  }

}

export { ImportCategoryUseCase }