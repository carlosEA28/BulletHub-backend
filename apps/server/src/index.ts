import "dotenv/config";
import cors from "cors";
import express from "express";
import { auth } from "@my-better-t-app/auth";
import { toNodeHandler } from "better-auth/node";

const app = express();

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN || "", "http://localhost:5173"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
