import { inject, injectable } from 'tsyringe';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
export class CreateUserUseCase {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({name, email, username, password, drivers_license}: ICreateUserDTO) {
    await this.usersRepository.create({
      name,
      email,
      username,
      password,
      drivers_license
    })

  }

}