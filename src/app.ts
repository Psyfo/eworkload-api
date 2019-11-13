import compression from "compression";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import path from "path";

import { default as dbConfig } from "./config/keys.config";
import SERVER from "./graphql/schema";

// CONFIG VARIABLES
const app = express();
const db = dbConfig.MongoURI;

// MONGOOSE CONFIG
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch(err => {
    console.log(err);
  });
mongoose.set("debug", true);
mongoose.connection.on("error", error => console.log(error));

// MIDDLEWARE (BE AWARE THAT ORDER MAY BE RELEVANT)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cors());
app.use(compression);

// GRAPHQL SERVER
SERVER.applyMiddleware({
  app: app
});

// SERVE & LISTEN
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;
httpServer.listen({ port: PORT }, () =>
  console.log(`Server running at: http://localhost:${PORT}/graphql`)
);
