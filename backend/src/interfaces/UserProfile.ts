//* Interface for creating a new user profile
export interface IUserProfile {
  id: number;
  name: string;
  birth_date: string | Date;
  sex: "M" | "F" | "O";
  height: number;
  start_weight: number;
  goal_weight: number;
  created_at: Date;
  updated_at: Date;
}
