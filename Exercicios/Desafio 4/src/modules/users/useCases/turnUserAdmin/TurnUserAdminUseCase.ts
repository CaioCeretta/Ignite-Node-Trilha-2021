import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const foundUser = this.usersRepository.findById(user_id);

    if (!foundUser) {
      throw new Error("No user was found");
    }

    const newUser = this.usersRepository.turnAdmin(foundUser);

    return newUser;
  }
}

export { TurnUserAdminUseCase };
