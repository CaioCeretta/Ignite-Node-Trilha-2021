import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, username, password, drivers_license }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      username,
      password,
      drivers_license,
    })

    await this.repository.save(user);
  }

}