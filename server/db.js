const { Pool } = require('pg')
const pool = new Pool({
    user: 'erim',
    host: 'localhost',
    database: 'postgres',
    password: '',
    port: 5432,
 });

 module.exports = pool