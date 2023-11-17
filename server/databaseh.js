const Pool= require('pg').Pool


require('dotenv').config();

const pool= new Pool({
    user:process.env.USERN,
    password:process.env.PASSWORD,
    host:process.env.HOST,
    port:process.env.DBPORT,
    database: 'todo_app_nz62'
})


module.exports= pool
