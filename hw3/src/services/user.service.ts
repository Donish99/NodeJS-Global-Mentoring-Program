import { checkHash, generateHash } from "../utils";
import UserRepository from "../data-access/user.repository";
import User, { UserAttributes } from "../models/user.model";

class UsersService {
  async getAutoSuggestUsers(
    limit: number,
    loginSubstring: string
  ): Promise<User[]> {
    return UserRepository.getAutoSuggestUsers(loginSubstring, limit);
  }

  async getUserById(id: number): Promise<User | null> {
    return UserRepository.findById(id);
  }

  async createUser(user: UserAttributes): Promise<User> {
    return UserRepository.create(user);
  }

  async updateUser(id: number, user: UserAttributes): Promise<number> {
    return UserRepository.update(id, user);
  }

  async deleteUser(id: number): Promise<number> {
    return UserRepository.delete(id);
  }

  async findByLogin(login: string): Promise<User | null> {
    return UserRepository.findByLogin(login);
  }
}

export default new UsersService();
