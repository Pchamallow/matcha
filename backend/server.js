import express from "express";
import path from "path";
import cors from "cors";
import { router as dbRoutes } from "./database/routes.js"
import { router as authRoutes } from "./authentification/routes.js"

const app = express();
const DB_PORT = process.env.DB_PORT;
const AUTH_PORT = process.env.AUTH_PORT;

app.use(express.json());
app.use(cors());
app.use("/api/db", dbRoutes);
app.use("/api/auth", authRoutes);

app.listen(DB_PORT, () => {
    console.log(`Database running at http://localhost:${DB_PORT}`);
});

app.listen(AUTH_PORT, () => {
    console.log(`Authentification running at http://localhost:${AUTH_PORT}`);
});
