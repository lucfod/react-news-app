process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.APP_ENV = process.env.APP_ENV || "development";

import dotenv from "dotenv";

console.log(process.env.APP_ENV);

dotenv.config({
  path: __dirname + "/../env/" + process.env.APP_ENV + ".env",
});

export const Config = {
  port: process.env.PORT || 4000,
  client_origin: "http://localhost:5173",
  jwt_access: process.env.JWT_ACCESS_KEY,
  jwt_refresh: process.env.JWT_REFRESH_KEY,
  datasource: {
    type: process.env.DB_TYPE,
    host: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ["src/database/models/*.js"],
    synchronize: true,
    logging: true,
    extra: {
      trustServerCertificate: true,
    },
  },
};
