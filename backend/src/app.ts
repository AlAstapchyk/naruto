import express, { Request, Response } from "express";
import { getData, getElement, incrementElementNumber, testReq } from "./db/pg";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/test", async (req: Request, res: Response) => {
  try {
    const data = await testReq();
    res.status(201).json(data);
  } catch (error) {
    console.log("Error while test:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/hello", (req: Request, res: Response) => {
  try {
    res.send({ data: "Hello, Express!" });
  } catch (error) {
    console.error("Error while hello:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/data", async (req: Request, res) => {
  try {
    const data = await getData();
    res.status(201).json(data);
  } catch (error) {
    console.error("Error recieving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/data/:id", async (req, res) => {
  try {
    const elId = parseInt(req.params.id);
    const data = await getElement(elId);
    res.status(201).json(data);
  } catch (error) {
    console.error("Error recieving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/data/:id/increment", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await incrementElementNumber(id);
    res.status(201).json(data);
  } catch (error) {
    console.error("Error recieving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Boom!!! Server is running on port ${PORT}`);
});
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Boom!!! Server is running on port ${PORT}`);
// });
