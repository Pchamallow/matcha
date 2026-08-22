import express from "express";
import path from "path";
import cors from "cors";
import { router as dbRoutes } from "./database/routes.js"
import { router as authRoutes } from "./authentification/routes.js"

const app = express();
const DB_PORT = 3000;
const AUTH_PORT = 3001;

app.use(express.json());
app.use(cors());
app.use("/", dbRoutes);
app.use("/api/authentification", authRoutes);

app.listen(DB_PORT, () => {
    console.log(`Database running at http://localhost:${DB_PORT}`);
});

app.listen(AUTH_PORT, () => {
    console.log(`Authentification running at http://localhost:${AUTH_PORT}`);
});
