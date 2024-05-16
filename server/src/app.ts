import cors from "cors";
import express from "express";
import globalErrorHandler from "./controllers/errorController";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json({ limit: "10kb" }));

app.use("/api/users", userRoutes);
app.use(globalErrorHandler);

export default app;
