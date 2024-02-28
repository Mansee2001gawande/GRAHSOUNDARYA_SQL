import mysql from 'mysql2';

const pool = mysql.createPool({
user : 'root',
password : 'root',
host : 'localhost',
database: 'grah_soundarya',
connectionLimit: 100
});
export default pool;



