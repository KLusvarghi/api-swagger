// este é o aquivo principla de configuraçẽos
import express from "express";
import mongoose from "mongoose";
import { routes } from "./routes";
import authRouter from "./auth/auth.routes";

import swaggerUi from "swagger-ui-express";
// importando o arquivo json
import swaggerJson from "./swagger.json";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.database();
    this.routes();
  }

  // aqui é onde será feito as configurações do express
  private middleware(): void {
    this.express.use(express.json());
    this.express.use(
      "/api-docs", // é por onde acessaremos a doc no browser
      swaggerUi.serve,
      swaggerUi.setup(swaggerJson)
    );
  }

  private async database() {
    try {
      await mongoose.connect("mongodb://0.0.0.0:27017/books");
      console.log("connect database success");
    } catch (err) {
      console.error("Fail to connect database", err);
    }
  }

  private routes(): void {
    this.express.use(routes);
    this.express.use("/auth", authRouter);
  }
}

export default new App().express;
