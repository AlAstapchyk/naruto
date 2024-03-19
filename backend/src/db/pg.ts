const { Pool } = require("pg");

const CELLS_NUBERS = 9;

if (!process.env.POSTGRES_PORT) console.error("Error because of POSTGRES_PORT = undefined");

type TColor = "red" | "orange" | "yellow" | "lime" | "green" | "cyan" | "blue" | "purple" | "pink";

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST || "db",
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
});

pool.on("connect", async (client: any) => {
  console.log("connecting...");
  await client
    .query("CREATE TABLE IF NOT EXISTS data")
    .catch((err: any) => console.log("PG ERROR", err));
});

export async function getCellsCollors() { 
  const data = (await pool.query("SELECT * FROM cells")).rows;
  const colorsArray = data.map((obj: any) => obj.color);
  return colorsArray;
}

export async function createTableReq() {
  try {
    await pool
      .query("CREATE TABLE IF NOT EXISTS cells (number SERIAL PRIMARY KEY, color VARCHAR(10))")
      .then(() => {
        intialyzeCells();
      })
      .catch(() => {
        throw new Error(
          "Error after CREATE TABLE IF NOT EXISTS data (id SERIAL PRIMARY KEY, name VARCHAR(10), number INTEGER) request"
        );
      });

    const result = await pool.query("SELECT * FROM cells");
    return result.rows;
  } catch (error) {
    console.error("Error while executing SQL queries:", error);
    throw error;
  }
}

export const updateCells = async (colors: Array<TColor | "">) => {
  try {
    if (colors === undefined) throw new Error();
    for (let i = 0; i < CELLS_NUBERS; i++) {
      if(i < colors.length) {
        const result = await pool.query("UPDATE cells SET color = $1 WHERE number = $2", [
          colors[i],
          i + 1,
        ]);
      } else {
        const result = await pool.query("UPDATE cells SET color = '' WHERE number = $1", [
          i + 1,
        ]);
      }
    }

    console.log("Cells updated successfully");
  } catch (error) {
    console.error("Error updating cells:", error);
  }
};

const intialyzeCells = async () => {
  await pool.query("INSERT INTO cells (color) VALUES ($1)", ["red" as TColor]);
  await pool.query("INSERT INTO cells (color) VALUES ($1)", ["blue" as TColor]);
  await pool.query("INSERT INTO cells (color) VALUES ($1)", [""]);
  await pool.query("INSERT INTO cells (color) VALUES ($1)", [""]);
  await pool.query("INSERT INTO cells (color) VALUES ($1)", [""]);
  await pool.query("INSERT INTO cells (color) VALUES ($1)", [""]);
  await pool.query("INSERT INTO cells (color) VALUES ($1)", ["red" as TColor]);
  await pool.query("INSERT INTO cells (color) VALUES ($1)", [""]);
  await pool.query("INSERT INTO cells (color) VALUES ($1)", ["orange" as TColor]);
};

export default pool;
