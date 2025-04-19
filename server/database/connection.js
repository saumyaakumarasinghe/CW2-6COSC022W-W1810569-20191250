const sqlite3 = require('sqlite3');
const path = require('path');

const dbFile = process.env.DB_NAME;
if (!dbFile) {
    throw new Error('DB_NAME is not defined in the environment variables');
}
const dbPath = path.resolve(__dirname, dbFile);

const database = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log(`✅ Connected to SQLite at ${dbFile}`);
    }
});

module.exports = database;
