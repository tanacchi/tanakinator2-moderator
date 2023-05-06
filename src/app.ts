import * as express from "express";
import * as morgan from "morgan";
import router from "./routes";

const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("combined"));

app.use("/", router);

export default app;
