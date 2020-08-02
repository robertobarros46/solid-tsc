//Fake repository

import { IUserRepository } from "../IUserRepository";
import { User } from "../../entities/Users";

export class PostgresUserRepository implements IUserRepository {
  private users: User[] = [];
  
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async save(user: User): Promise<void> {
    this.users.push(user)
  }
}