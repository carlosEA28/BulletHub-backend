import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import {auth} from "@my-better-t-app/auth";
import {toNodeHandler} from "better-auth/node";
import {cvRouter} from "@/routes/cv/cv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN || "", "http://localhost:5173"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization","Cookie"],
      exposedHeaders: ["Set-Cookie"],
    credentials: true,
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/api/cv",cvRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

});
