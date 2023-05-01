// data-access/user.repository.ts

import { Op } from "sequelize";
import User, { UserAttributes } from "../models/user.model";

class UserRepository {
  async getAutoSuggestUsers(
    loginSubstring: string,
    limit: number
  ): Promise<User[]> {
    const users = await User.findAll({
      where: {
        login: { [Op.like]: `%${loginSubstring}%` },
        isDeleted: false,
      },
      order: [["login", "ASC"]],
      limit: limit,
    });
    return users;
  }

  async findById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }
  async findByLogin(login: string): Promise<User | null> {
    return User.findOne({ where: { login } });
  }

  async create(user: UserAttributes): Promise<User> {
    return User.create(user);
  }

  async update(id: number, user: UserAttributes): Promise<number> {
    const [affectedCount] = await User.update(user, {
      where: { id },
    });
    return affectedCount;
  }

  async delete(id: number): Promise<number> {
    const [affectedCount] = await User.update(
      { isDeleted: true },
      {
        where: {
          id,
        },
      }
    );
    return affectedCount;
  }
}

export default new UserRepository();
