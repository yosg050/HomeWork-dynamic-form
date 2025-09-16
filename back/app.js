import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { buildYupFromSchema } from "./src/shared/index.js";
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

dotenv.config();

const app = express();

app.use(
  cors({
    origin: true, 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Accept",
    ],
    optionsSuccessStatus: 200,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    service: "Dynamic Form Backend",
  });
});

app.use("/api/schema", schemaRoutes);
app.use("/api/submissions", submissionsRoutes);
app.use("/api/analytics", analyticsRoutes);

// Root redirect
app.get("/", (req, res) => {
  res.json({ message: "Dynamic Form Backend API", status: "running" });
});

// Error handling
app.use(errorHandler);
app.use(notFound);

export default app;







// // @ts-nocheck
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { buildYupFromSchema } from "./src/shared/index.js";
// import { getSchema, getSchemaETag } from "./src/schema.js";
// import {
//   listSubmissions,
//   saveSubmission,
// } from "./src/services/submissions.Service.js";
// import submissionsRoutes from "./src/routes/submissions.routes.js";
// import schemaRoutes from "./src/routes/schema.routes.js";
// import { errorHandler } from "./src/middlewares/errorHandler.js";
// import { notFound } from "./src/middlewares/notFound.js";
// import analyticsRoutes from "./src/routes/analytics.routes.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/schema", schemaRoutes);
// app.use("/submissions", submissionsRoutes);
// app.use("/analytics", analyticsRoutes);
// app.use(errorHandler);

// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
