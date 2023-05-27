import mysql from 'mysql2';

export const db = mysql.createConnection({
    host:"db.cshack.site",
    user: "group06",
    port: 3306,
    password: "201216242",
});
