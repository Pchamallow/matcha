import express from "express";
import path from "path";
import cors from "cors";
import routes from "./database/routes.js"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/", routes);
app.use(express.static(path.join(__dirname, "../frontend")));

app.listen(port, () => {
    console.log("Backend running at http://localhost:3000");
});
