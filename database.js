var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'db-5nspr-fkr.cdb.fin-ntruss.com',
    port: '3306',
    user: 'youngin0108',
    password: '!qlalf7431',
    database: 'db'
});

conn.connect();

conn.query('SELECT * FROM weatherTable', function(err, results, fields){
    if(err){
        console.log(err);
    }
    console.log(results);
});

conn.end();