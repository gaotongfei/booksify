import * as path from "path"
import * as fs from "fs"
const pf = require("platform-folders")

const dataHomePath = pf.getDataHome()

const appDir = path.join(dataHomePath, "booksify")
if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir)
}

const db = require("better-sqlite3")(path.join(appDir, "data.db"))

db.exec(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY,
            name TEXT,
            description TEXT,
            cover_pic TEXT,
            created_at INTEGER,
            updated_at INTEGER
        );
        CREATE TABLE IF NOT EXISTS chapters (
            id INTEGER PRIMARY KEY,
            title TEXT,
            content TEXT,
            book_id INTEGER,
            created_at INTEGER,
            updated_at INTEGER
        )
    `)
export default db
