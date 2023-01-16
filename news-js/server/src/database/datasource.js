import { DataSource } from "typeorm";
import { Config } from "../config";

export const AppDataSource = new DataSource(Config.datasource);
