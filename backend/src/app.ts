import express from "express";
import cors from "cors";
import routes from "./routes";
import { createTableReq } from "./db/pg";

const app = express();
app.use(cors());
app.use("/", routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Boom!!! Server is running on port ${PORT}`);
});
export default app;

createTableReq()