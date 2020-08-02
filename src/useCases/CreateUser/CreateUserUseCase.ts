import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/Users";
import { IEmailProvider } from "../../providers/IEmailProvider";

export class CreateUserUseCase {
  
  constructor(
    private usersRepository: IUserRepository,
    private mailProvider: IEmailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User alredy exists');
    }

    const user = new User(data);

    await this.usersRepository.save(user); 

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: 'Equipe do meu app',
        email: 'equipe@meuapp.com'
      },
      subject: 'Seja bem-vindo à plataforma',
      body: '<h1>Você já pode fazer login em nossa plataforma</h1>'
    })
  }
}