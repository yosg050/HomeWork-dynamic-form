// @ts-nocheck
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

let buildYupFromSchema;
if (fs.existsSync("./src/shared/index.js")) {
  const { buildYupFromSchema: prod } = await import("./src/shared/index.js");
  buildYupFromSchema = prod;
} else {
  const { buildYupFromSchema: dev } = await import("./src/shared/index.js");
  buildYupFromSchema = dev;
}

import { getSchema, getSchemaETag } from "./src/schema.js";
import {
  listSubmissions,
  saveSubmission,
} from "./src/services/submissions.Service.js";
import submissionsRoutes from "./src/routes/submissions.routes.js";
import schemaRoutes from "./src/routes/schema.routes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { notFound } from "./src/middlewares/notFound.js";
import analyticsRoutes from "./src/routes/analytics.routes.js";
import { corsHandler } from "./src/middlewares/corsHandler.js";

dotenv.config();
const app = express();
app.use(corsHandler);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://front-psi-peach.vercel.app", // הURL החדש
      "https://front-kujdgv8st-yosef-gellers-projects.vercel.app", // הURL הישן
      "https://front-a55dnp2jy-yosef-gellers-projects.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

app.options("*", cors());

app.use(express.json());

app.use("/schema", schemaRoutes);
app.use("/submissions", submissionsRoutes);
app.use("/analytics", analyticsRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
