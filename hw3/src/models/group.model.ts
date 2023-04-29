import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";

type Permission = "READ" | "WRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";

export interface GroupAttributes {
  id: number;
  name: string;
  permissions: Array<Permission>;
}

class Group extends Model<GroupAttributes> implements GroupAttributes {
  public id!: number;
  public name!: string;
  public permissions!: Permission[];
}

Group.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
  },
  { sequelize, modelName: "Group" }
);

Group.sync();

export default Group;
