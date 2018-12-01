const sqlite3 = require('sqlite3').verbose();
export const db = new sqlite3.cached.Database('/tmp/booksify.sqlite3');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY,
            name TEXT,
            description TEXT,
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
})
export default db
