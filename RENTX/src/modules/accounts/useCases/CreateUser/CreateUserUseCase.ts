import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AppError } from '../../../../errors/AppError';

@injectable()
export class CreateUserUseCase {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({name, email, password, drivers_license}: ICreateUserDTO) {

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if(userAlreadyExists) {
      throw new AppError('User already exists', 401);
    }

    const hashedPassword = await hash(password, 8);


    await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      drivers_license
    })

  }

}