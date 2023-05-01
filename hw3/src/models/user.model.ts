import { Model, DataTypes } from "sequelize";
import { generateHash } from "../utils";
import sequelize from "./sequelize";

export interface UserAttributes {
  id: number;
  password: string;
  login: string;
  age: number;
  isDeleted: boolean;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public password!: string;
  public login!: string;
  public age!: number;
  public isDeleted!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate: async (user: UserAttributes) => {
        const hashedPassword = await generateHash(user.password);
        user.password = hashedPassword;
      },
    },
  }
);

User.sync();

export default User;
