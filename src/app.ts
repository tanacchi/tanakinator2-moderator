import * as express from "express";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerJSDoc from "swagger-jsdoc";
import router from "./routes";

const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/progress", router);

// API Document
const options = {
  swaggerDefinition: {
    info: {
      title: "tanakinator2-moderator",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*"],
};
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

export default app;
