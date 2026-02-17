import { DataTypes, Model, Optional } from "sequelize";
import { IUser } from "../interfaces/User";
import sequelize from "../database/connection";

interface UserCreationAttributes extends Optional<
  IUser,
  "id" | "createdAt" | "updatedAt"
> {}

export class User
  extends Model<IUser, UserCreationAttributes>
  implements IUser
{
  public id!: number;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "users",
  },
);
