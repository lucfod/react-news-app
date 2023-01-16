import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import { Config } from "./config";
import authMW from "./middlewares/auth.mw";
import errorMW from "./middlewares/error.mw";
import { AuthRouter } from "./routes/auth.routes";
import { UserRouter } from "./routes/user.routes";
import { PostRouter } from "./routes/post.routes";
import { CategoryRouter } from "./routes/category.routes";
import { RegionRouter } from "./routes/region.routes";
import { AppDataSource } from "./database/datasource";
import { DbInit } from "./database/dbInit";

export class App {
  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
    this.connections();
  }

  settings() {
    this.app.set("pkg", { name: "NewsApp", version: "1.0" });
    this.app.set("port", Config.port);
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: Config.client_origin,
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(authMW());
    this.app.use(errorMW);
  }

  routes() {
    this.app.use("/api/auth", AuthRouter);
    this.app.use("/api/users", UserRouter);
    this.app.use("/api/posts", PostRouter);
    this.app.use("/api/categories", CategoryRouter);
    this.app.use("/api/regions", RegionRouter);
  }

  async connections() {
    await AppDataSource.initialize();
    await DbInit();
  }

  async listen() {
    const _port = this.app.get("port");
    this.app.listen(_port);
    console.log("server on port", _port);
  }
}
