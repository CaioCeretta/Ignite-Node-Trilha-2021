import { v4 as uuid } from "uuid";

import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    const admin = false;

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const foundUser = this.users.find((user) => user.id === id);

    return foundUser;
  }

  findByEmail(email: string): User | undefined {
    const foundUser = this.users.find((user) => user.email === email);

    return foundUser;
  }

  turnAdmin(receivedUser: User): User {
    const { id } = receivedUser;

    const userIndex = this.users.findIndex((user) => id === user.id);

    const newUser = {
      ...receivedUser,
      admin: true,
      updated_at: new Date(),
    };

    this.users.splice(userIndex, 1);
    this.users.push(newUser);

    return newUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
