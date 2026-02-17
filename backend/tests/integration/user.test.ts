import sequelize from "../../src/database/connection";
import User from "../../src/models/User";

describe("User Integration Tests", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await User.destroy({ where: {}, truncate: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("should create a new user", async () => {
    const user = await User.create({
      email: "test@example.com",
      password: "123456789",
    });
    expect(user).toBeDefined();
  });

  test("should retrieve user email", async () => {
    const user = await User.create({
      email: "test@example.com",
      password: "123456789",
    });
    const foundUser = await User.findOne({
      where: { email: "test@example.com" },
    });
    expect(foundUser).toBeDefined();
  });

  test("should update user information", async () => {
    const user = await User.create({
      email: "test@example.com",
      password: "123456789",
    });
    user.email = "updated@example.com";
    await user.save();
    const updatedUser = await User.findOne({
      where: { email: "updated@example.com" },
    });
    expect(updatedUser).toBeDefined();
  });

  test("should delete a user", async () => {
    const user = await User.create({
      email: "test@example.com",
      password: "123456789",
    });
    await user.destroy();
    const deletedUser = await User.findOne({
      where: { email: "test@example.com" },
    });
    expect(deletedUser).toBeNull();
  });
});
