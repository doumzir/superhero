import express from "express";
import routes from "./routes/router.js";

export const app = express();
const port = 3000;

app.use(express.json());

app.use("/superHeros", routes);

app.listen(port, () => console.log(`En écoute sur le port ${port}!`));
