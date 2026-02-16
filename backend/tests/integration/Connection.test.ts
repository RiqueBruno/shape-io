import sequelize from "../../src/database/connection";

describe("Database Connection", () => {
  beforeAll(async () => {
    await sequelize.authenticate();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("should authenticate successfully", async () => {
    await expect(sequelize.authenticate()).resolves.not.toThrow();
  });

  test("should be defined", () => {
    expect(sequelize).toBeDefined();
  });
});
