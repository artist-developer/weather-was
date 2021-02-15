var app = require("express")();
var http = require("http").createServer(app);
var axios = require("axios");
var cors = require("cors");
const { json } = require("express");
var mysql = require('mysql');

const weather_info =
'{"coord":{"lon":126.9778,"lat":37.5683},\
"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],\
"base":"stations","main":{"temp":2.68,"feels_like":-6.8,"temp_min":2,\
"temp_max":3,"pressure":1010,"humidity":41},\
"visibility":10000,"wind":{"speed":9.26,"deg":280,"gust":15.43},\
"clouds":{"all":20},"dt":1613368560,"sys":{"type":1,"id":8105,\
"country":"KR","sunrise":1613341321,"sunset":1613380242},\
"timezone":32400,"id":1835848,"name":"Seoul","cod":200}';

const weather_obj = JSON.parse(weather_info);

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

app.use("/get-weather", async function (req, res) {
  console.log("get-weather");

  var sql = "INSERT INTO weatherTable VALUES (NULL, " 
      + weather_obj.main.temp +", "
      + weather_obj.main.feels_like +", "
      + weather_obj.main.temp_min +", "
      + weather_obj.main.temp_max +", "
      + weather_obj.main.pressure +", "
      + weather_obj.main.humidity +")";
  conn.query(sql, function(err, results, fields){
    if(err){
      console.log(err);
    }
    console.log("weather info inserted.");
  });

  res.send(weather_obj);  
});

app.use("/", function(req, res) {
	console.log("health check");
  res.send("HTTP 200 Ok");
});

// 서버리슨
http.listen(8080, () => {
  console.log("Server listening on port 8080");
});

