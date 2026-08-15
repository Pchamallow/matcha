import express from "express";
import path from "path";
import cors from "cors";
import routes from "./database/routes.js"

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/", routes);

app.listen(port, () => {
    console.log("Backend running at http://localhost:3000");
});
