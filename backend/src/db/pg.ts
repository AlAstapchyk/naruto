const { Pool } = require("pg");

if (!process.env.POSTGRES_PORT) console.error("Error because of POSTGRES_PORT = undefined");

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST || "db",
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432
});

pool.on("connect", async (client: any) => {
  console.log("connecting...");
  await client
    .query("CREATE TABLE IF NOT EXISTS data")
    .catch((err: any) => console.log("PG ERROR", err));
});

export async function getData() {
  return await pool.query("SELECT * FROM data;").then((data: any) => data.rows);
}

export async function getElement(elId: number) {
  return await pool
    .query("SELECT * FROM data WHERE id = $1", [elId])
    .then((data: any) => data.rows[0]);
}

export async function incrementElementNumber(elId: number) {
  return await pool.query(`UPDATE data SET number = number + 1 WHERE id = ${elId}`);
}

export async function createTableReq() {
  try {
    await pool
      .query(
        "CREATE TABLE IF NOT EXISTS data (id SERIAL PRIMARY KEY, name VARCHAR(10), number INTEGER)"
      )
      .catch(() => {
        throw new Error(
          "Error after CREATE TABLE IF NOT EXISTS data (id SERIAL PRIMARY KEY, name VARCHAR(10), number INTEGER) request"
        );
      });
    await pool.query("INSERT INTO data (name, number) VALUES ($1, $2)", ["Mike", 40]);
    const result = await pool.query("SELECT * FROM data");
    return result.rows;
  } catch (error) {
    console.error("Error while executing SQL queries:", error);
    throw error; // Re-throw the error for handling in the caller function
  }
}

export default pool;
