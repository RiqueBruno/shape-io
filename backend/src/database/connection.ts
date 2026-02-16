import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const inTestEnv = process.env.NODE_ENV === "test";

let sequelize: Sequelize;

if (inTestEnv) {
  console.log("Using in-memory SQLite database for testing.");
  sequelize = new Sequelize("sqlite::memory:", {
    logging: false,
  });
} else {
  console.log("Using PostgreSQL database for production.");
  sequelize = new Sequelize(process.env.DB_NAME || "mydatabase", {
    dialect: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}

export default sequelize;
