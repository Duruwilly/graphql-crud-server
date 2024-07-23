import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { createHandler } from "graphql-http/lib/use/express";
import expressPlayground from "graphql-playground-middleware-express"
import schema from "./schema/schema.js";
import colors from "colors"
import { connectDB } from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// connect to database
connectDB()
app.use(cors())

app.all(
  "/graphql",
  createHandler({ schema, graphiql: process.env.NODE_ENV === "development" })
);

app.get('/playground', expressPlayground.default({ endpoint: '/graphql' }))
app.listen(port, console.log(`server is running on port http://localhost:${port}/graphql`));
