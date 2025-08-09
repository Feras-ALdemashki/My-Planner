import mysql2 from "mysql2/promise";
import fs from "fs";
import "dotenv/config";

export const db = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  multipleStatements: true,
  ssl: {
    ca: fs.readFileSync("./ca.pem"),
  },
});

// Optional test connection
db.getConnection()
  .then((connection) => {
    console.log("Connected to the database!");
    connection.release();
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
