import mysql from 'mysql2';

const db = mysql.createConnection({
    host: "db.cshack.site",
    port: 3306,
    user: "group06",
    database: "MariaDB",
    password: "201216242",
});

export default db;