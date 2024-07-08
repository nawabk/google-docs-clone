import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import globalErrorHandler from "./controllers/errorController";
import documentRoutes from "./routes/documentRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));

app.use("/api/users", userRoutes);
app.use("/api/documents/", documentRoutes);
app.use(globalErrorHandler);

export default app;
