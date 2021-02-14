var app = require("express")();
var http = require("http").createServer(app);
var axios = require("axios");
var cors = require("cors");
const { json } = require("express");
var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'db-5nspr-fkr.cdb.fin-ntruss.com',
    port: '3306',
    user: 'youngin0108',
    password: '!qlalf7431',
    database: 'db'
});

const API_KEY = "3b5b2c5a5d90ef09d98c467547d79f52";
const region = "Seoul";

app.use(cors());

conn.connect();

app.use("/get-weather", async function (req, res) {
  console.log("get-weather");

  const result = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${region}&APPID=${API_KEY}&units=metric`
  );
  
  var sql = "INSERT INTO weatherTable VALUES (NULL, " 
            + result.data.main.temp +", "
            + result.data.main.feels_like +", "
            + result.data.main.temp_min +", "
            + result.data.main.temp_max +", "
            + result.data.main.pressure +", "
            + result.data.main.humidity +", "
            + result.data.name + ")";
  conn.query(sql, function(err, results, fields){
    if(err){
      console.log(err);
    }
    console.log("weather info " + results.insertid + " inserted.");
  });

  res.send(result.data);  
});

app.use("/", function(req, res) {
  res.send("HTTP 200 Ok");
});

// 서버리슨
http.listen(8080, () => {
  console.log("Server listening on port 8080");
});

conn.end();