const mysql = require("mysql2/promise");
require("dotenv").config();


const getConnection = async () => {
  return await mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DB,
  });

}

module.exports = { getConnection };  