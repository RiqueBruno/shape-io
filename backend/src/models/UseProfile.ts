import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/connection";
import { IUserProfile } from "../interfaces/UserProfile";
import { User } from "./User";

interface ProfileCreationAttributes extends Optional<
  IUserProfile,
  "created_at" | "updated_at"
> {}

export class UserProfile
  extends Model<IUserProfile, ProfileCreationAttributes>
  implements IUserProfile
{
  public user_id!: number;
  public name!: string;
  public birth_date!: string | Date;
  public sex!: "M" | "F" | "O";
  public height!: number;
  public start_weight!: number;
  public goal_weight!: number;
}

UserProfile.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "users", key: "id" },
    },
    name: { type: DataTypes.STRING, allowNull: false },
    birth_date: { type: DataTypes.DATEONLY, allowNull: false },
    sex: { type: DataTypes.ENUM("M", "F", "O"), allowNull: false },
    height: { type: DataTypes.FLOAT, allowNull: false },
    start_weight: { type: DataTypes.FLOAT, allowNull: false },
    goal_weight: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    sequelize,
    tableName: "user_profiles",
    timestamps: true,
    underscored: true,
  },
);

User.hasOne(UserProfile, { foreignKey: "user_id", as: "profile" });
UserProfile.belongsTo(User, { foreignKey: "user_id", as: "user" });
