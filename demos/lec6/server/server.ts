import express, { Express } from "express";
import cors from "cors";

const app: Express = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// GET

// POST

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
