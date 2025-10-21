import { Database } from "bun:sqlite";

const db = new Database("app.db");

db.run(`
    CREATE TABLE IF NOT EXISTS
    USERS (
        id INTEGER PRIMARY KEY,
        email VARCHAR(255),
        pwd TEXT
    )
`);