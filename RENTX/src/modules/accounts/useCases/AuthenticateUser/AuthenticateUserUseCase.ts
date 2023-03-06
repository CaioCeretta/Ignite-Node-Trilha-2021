import { inject, injectable } from 'tsyringe';
import { compare }  from 'bcrypt';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { sign } from 'jsonwebtoken';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}

  async execute({ email, password }: IRequest): Promise<IResponse> {

    // console.log(email, password);
    // Usuario existe
    const foundUser = await this.usersRepository.findByEmail(email);

    if(!foundUser) {
      throw new AppError("Email or password is incorrect", 400);
    }

    console.log(foundUser.password, password)
    // Senha está correta
    const correctPassword = await compare(password, foundUser.password);

    if(!correctPassword) {
      throw new AppError("Email or password is incorrect", 400);
    }


    // Gerar jwt
    const token = sign({}, '3ec4bedcab551f96573450f68236a641', {
      subject: foundUser.id,
      expiresIn: '1d'
    });


    const tokenReturn: IResponse  = {
      token,
      user: {
        name: foundUser.name,
        email: foundUser.email
      }
    }

    
    return tokenReturn

  }
}