import bodyParser from "body-parser";
import config from "./config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import routes from "./REST/routes";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import openApiValidator from "express-openapi-validator";

const app = express();
app.use(express.static(__dirname + "/public"));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "2048kb" }));
app.use(express.static("public"));
app.use(cors());
const swaggerJsDocOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Employees API",
      version: "1.0.0",
      description: "A REST service for managing an employees data store.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [`${__dirname}/REST/*.endpoint.js`],
};
const apiSpec = swaggerJsDoc(swaggerJsDocOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiSpec));
mongoose.connect(
  config.databaseUrl,
  {
    useNewUrlParser: true,
  },
  (error) => {
    if (error) {
      console.error(error);
    } else {
      console.info("Connect with database estabilished");
    }
  }
);

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.error(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

routes(app);

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
if (process.env.NODE_ENV !== "test") {
  app.listen(config.port, () => {
    console.info(`Server is running at ${config.port}`);
  });
}
export default app;
