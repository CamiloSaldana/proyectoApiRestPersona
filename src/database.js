const mysql = require ('mysql');

const mysqlConnection =mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'secret',
    database: 'persona_db'
});

mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('DB esta conectada');
    }
});

module.exports = mysqlConnection;