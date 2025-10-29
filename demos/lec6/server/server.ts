import express, { Express } from "express";
import cors from "cors";

const app: Express = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// GET
app.get("/api/", async (req, res) => {
  res.send("Hello world!");
});

// POST
app.post("/api/", async (req, res) => {
  try {
    const key = req.body.key;
    if (!key) {
      throw new Error("key not found");
    }
    console.log(key);
    // Do something with the key
    res.json({ message: `Hello, world! Your key was ${key}` });
  } catch (e: any) {
    res.status(404).json({ error: e.message });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
