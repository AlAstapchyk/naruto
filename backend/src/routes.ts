import express, { Request, Response } from "express";
import { getData, getElement, incrementElementNumber } from "./db/pg";

const router = express.Router();

router.get("/hello", (req: Request, res: Response) => {
    try {
      res.send({ data: "Hello, Express!" });
    } catch (error) {
      console.error("Error while hello:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

router.get("/data", async (req: Request, res: Response) => {
  try {
    const data = await getData();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error receiving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/data/:id", async (req, res) => {
  try {
    const elId = parseInt(req.params.id);
    const data = await getElement(elId);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error receiving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/data/:id/increment", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await incrementElementNumber(id);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error receiving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;