import { Model, DataTypes } from "sequelize";
import Group from "./group.model";
import User from "./user.model";
import sequelize from "./sequelize";

export class UserGroup extends Model {
  public userId!: number;
  public groupId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserGroup.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Group,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "UserGroup",
  }
);

export default UserGroup;
