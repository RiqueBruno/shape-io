import sequelize from "../../src/database/connection";
import { User } from "../../src/models/User";
import { UserProfile } from "../../src/models/UseProfile";

describe("User Profile Integration Tests", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await User.destroy({ where: {}, cascade: true, truncate: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("should create a profile for an existing user", async () => {
    const user = await User.create({
      email: "bruno@shape.io",
      password: "hash_seguro",
    });

    const profile = await UserProfile.create({
      user_id: user.id,
      name: "Bruno Henrique",
      birth_date: "1990-01-07",
      sex: "M",
      height: 1.81,
      start_weight: 173.0,
      goal_weight: 100.0,
    });

    expect(profile.user_id).toBe(user.id);
    expect(profile.name).toBe("Bruno Henrique");
    expect(profile.start_weight).toBe(173.0);
  });

  test("should not allow profile creation without a valid user_id", async () => {
    await expect(
      UserProfile.create({
        user_id: 999,
        name: "Erro",
        birth_date: "2000-01-01",
        sex: "M",
        height: 1.7,
        start_weight: 80,
        goal_weight: 70,
      }),
    ).rejects.toThrow();
  });
});
