import express, { Request, Response } from "express";
import { getCellsCollors, updateCells } from "./db/pg";

const router = express.Router();

type TColor = "red" | "orange" | "yellow" | "lime" | "green" | "cyan" | "blue" | "purple" | "pink";

router.get("/hello", (req: Request, res: Response) => {
  try {
    res.send({ data: "Hello, Express!" });
  } catch (error) {
    console.error("Error while hello:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/cells", async (req: Request, res: Response) => {
  try {
    const collors = await getCellsCollors();
    console.log(collors);
    res.status(200).json(collors);
  } catch (error) {
    console.error("Error receiving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/cells", async (req: Request, res: Response) => {
  try {
    const cells = req.body;
    console.log(cells);
    const data = await updateCells(cells);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error receiving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
